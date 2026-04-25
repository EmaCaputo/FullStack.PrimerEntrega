const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const productoRoutes = require('./routes/productoRoutes'); //Importo las rutas de productos
const colorRoutes = require('./routes/colorRoutes'); //Importo las rutas de colores
const tipoRoutes = require('./routes/tipoRoutes'); //Importo las rutas de tipos
const categoriaRoutes = require('./routes/categoriaRoutes'); //Importo las rutas de categorias
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');
const authRoutes = require('./routes/authRoutes'); //Importo las rutas de autenticación
const authorize = require('./middleware/authorize'); //Importo el middleware de autorización

const app = express(); //Levanto la APP (Objeto app)


//Cargo los modulos de la APP dentro del Route.
app.use(bodyParser.json()); //genero el bodyparser para los envios de Json.
app.use(bodyParser.urlencoded({extended: false}));
app.use('/auth', authRoutes); //Uso el middleware de autenticación para proteger las rutas, cualquier ruta que no tenga un token válido no podrá acceder a los recursos protegidos.    
app.use('/productos', productoRoutes); //Uso las rutas de productos, con el prefijo /api/productos
app.use('/colores', colorRoutes); //Uso las rutas de colores, con el prefijo /api/colores
app.use('/tipos', tipoRoutes); //Uso las rutas de tipos, con el prefijo /api/tipos
app.use('/categorias', categoriaRoutes); //Uso las rutas de categorias, con el prefijo /api/categorias
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// cuando inicio mi pagina, llamo a la vista
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname,'/views/text.html'));
});


module.exports = app;