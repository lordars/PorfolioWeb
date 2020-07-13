const express = require('express');
const router = express.Router();
const curriculoController = require("../controllers/CurriculoControllers")

router.get("/",(req,res,next)=>{
    res.render("index",{
    title: "Meu primeiro servidor Express",
    Version: "0.0.0"
})

});

router.get("/curriculo",(req,res,next)=>{

    const curriculoData = curriculoController.getData();
    res.render("curriculo",curriculoData)
})



module.exports = router;