//const db = require("./db/models");
const express = require("express");
const app = express();
app.use(express.json());
const db = require("./db/models");
const produto = require('./controllers/produto');
const usuario = require('./controllers/usuario');
const validar = require('./controllers/validar');
const mercado = require('./controllers/mercado');
app.use('/', produto);
app.use('/', usuario);
app.use('/', validar);
app.use('/', mercado);
app.listen(8080, () =>{
    console.log("inicializado na porta 8080");
});

// npm run dev app.js