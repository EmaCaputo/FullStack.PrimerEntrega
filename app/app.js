const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const productoRoutes = require('./routes/productoRoutes'); //Importo las rutas de productos

const app = express(); //Levanto la APP (Objeto app)

//Cargo los modulos de la APP dentro del Route.

app.use(bodyParser.json()); //genero el bodyparser para los envios de Json.
app.use(bodyParser.urlencoded({extended: false}));
app.use('/api/productos', productoRoutes); //Uso las rutas de productos, con el prefijo /api/productos

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