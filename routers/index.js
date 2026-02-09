const express = require("express");
const router = express.Router();
const portfolioController = require("../controllers/CurriculoControllers");

router.get("/", portfolioController.renderPortfolio);
router.get("/curriculo", (req, res) => res.redirect("/pt-BR"));
router.get("/:lang(pt-BR|pt|es|en)", portfolioController.renderPortfolio);

module.exports = router;
