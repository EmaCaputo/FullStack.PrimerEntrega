const { log } = require('node:console');
const app = require('./app/app');
const config = require('./app/config/config');
const mongoose = require('mongoose');
const db = require('./app/config/database');


async function startServer() {
  try {
    await db.connect(); // llamo a la conexión

    app.listen(config.PORT, () => {
      console.log(`🚀 Servidor corriendo en: http://localhost:${config.PORT}`); //levanto el puerto
    });

  } catch (error) {
    console.error('❌ Error al iniciar el servidor');
  }
}

startServer();


