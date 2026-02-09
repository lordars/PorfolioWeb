const data = require("../model/data");
const { getGitHubProjects } = require("../services/githubService");

const SUPPORTED_LANGS = ["pt-BR", "es", "en"];

function resolveLang(requestedLang) {
  if (!requestedLang) return "pt-BR";
  if (requestedLang === "pt") return "pt-BR";
  return SUPPORTED_LANGS.includes(requestedLang) ? requestedLang : "pt-BR";
}

exports.renderPortfolio = async (req, res, next) => {
  try {
    const lang = resolveLang(req.params.lang || req.query.lang);
    const translations = data.translations[lang];
    const projects = await getGitHubProjects(data.github.username, lang);

    res.render("index", {
      lang,
      supportedLangs: SUPPORTED_LANGS,
      translations,
      profile: data.profile,
      portfolioUrl: data.portfolioUrl,
      experience: data.experience[lang],
      education: data.education[lang],
      skills: data.skills,
      highlights: data.highlights[lang],
      certifications: data.certifications[lang],
      projects,
      contact: data.contact,
      github: data.github,
      linkedin: data.linkedin,
      version: data.version,
    });
  } catch (error) {
    next(error);
  }
};
