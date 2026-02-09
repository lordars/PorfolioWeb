const https = require("https");

function requestJson(url) {
  return new Promise((resolve, reject) => {
    const request = https.get(
      url,
      {
        headers: {
          "User-Agent": "portfolio-web",
          Accept: "application/vnd.github+json",
        },
      },
      (response) => {
        let body = "";
        response.on("data", (chunk) => {
          body += chunk;
        });
        response.on("end", () => {
          if (response.statusCode < 200 || response.statusCode >= 300) {
            return reject(new Error(`GitHub API error: ${response.statusCode}`));
          }
          try {
            resolve(JSON.parse(body));
          } catch (error) {
            reject(error);
          }
        });
      }
    );

    request.on("error", reject);
    request.setTimeout(5000, () => {
      request.destroy(new Error("GitHub API timeout"));
    });
  });
}

function getFallbackProjects(lang) {
  const byLang = {
    "pt-BR": "Projeto portfólio pessoal com Node.js, Express e EJS.",
    es: "Proyecto de portafolio personal con Node.js, Express y EJS.",
    en: "Personal portfolio project built with Node.js, Express and EJS.",
  };

  return [
    {
      name: "PorfolioWeb",
      description: byLang[lang],
      url: "https://github.com/lordars/PorfolioWeb",
      language: "JavaScript",
      updatedAt: "",
      stars: 0,
    },
  ];
}

exports.getGitHubProjects = async (username, lang) => {
  try {
    const url = `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`;
    const repos = await requestJson(url);

    return repos
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 8)
      .map((repo) => ({
        name: repo.name,
        description:
          repo.description ||
          ({
            "pt-BR": "Sem descrição publicada no GitHub.",
            es: "Sin descripción publicada en GitHub.",
            en: "No description published on GitHub.",
          }[lang]),
        url: repo.html_url,
        language: repo.language || "N/A",
        updatedAt: repo.updated_at,
        stars: repo.stargazers_count || 0,
      }));
  } catch (error) {
    return getFallbackProjects(lang);
  }
};
