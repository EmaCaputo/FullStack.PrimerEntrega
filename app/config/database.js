const mongoose = require('mongoose');
const config = require('./config');

let connection = null;

module.exports = {
    connect: async () => {
        if (connection) return connection;

        try {
            connection = await mongoose.connect(config.DB);
            console.log('✅ Conexión a la base de datos establecida');
            return connection;
        } catch (error) {
            console.error('❌ Error al conectar a la base de datos:', error);
            throw error;
        }
    }
};