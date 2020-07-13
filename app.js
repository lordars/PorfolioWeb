const express = require("express");
const createError = require('http-errors');
const port = 3000;
const app = express();
const path = require ("path")
const curriculoController = require('./controllers/CurriculoControllers');
const router = require("./routers/index")
///Criando views
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname, 'public')));
app.set("view engine","ejs")

// Criando Server.
app.use("/", router)
app.use("/curriculo", router)
app.listen(port,err=>{
    console.log ("Serven ON ${port}")
});

// 404
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});


