const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Arfuch',
      version: '1.0.0',
      description: 'Documentación de la API de productos',
    },
    servers: [
      {
        url: `http://localhost:${config.PORT}`,
      },
    ],
  },
  apis: ['./routes/*.js'], // aca defino mis rutas para que swagger las lea y genere la documentación, en este caso todas las rutas dentro de la carpeta routes
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;