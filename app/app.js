const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// cuando inicio mi pagina, llamo a la vista
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/text.html'));
});

/*

// Mensaje con un estado, en este caso envio un Json
app.get('/', (req, res) => {
    res.status(200).send({message: "Bienvenido a mi appi rest"})
})
*/
module.exports = app;