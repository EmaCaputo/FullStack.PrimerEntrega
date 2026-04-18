const swaggerJSDoc = require('swagger-jsdoc');
const config = require('./config');
const path = require('path');

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
  apis: [
  path.join(process.cwd(), 'app/routes/*.js')
]
};

const swaggerSpec = swaggerJSDoc(options);


module.exports = swaggerSpec;