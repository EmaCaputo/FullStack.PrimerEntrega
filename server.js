const { log } = require('node:console');
const app = require('./app/app');
const config = require('./app/config/config');


// Genero el listen a mi puerto definido
app.listen(config.PORT, err => {
    if (err) return console.log(err)
    console.log(`Servidor corriendo en: http://localhost:${config.PORT}` );  
})