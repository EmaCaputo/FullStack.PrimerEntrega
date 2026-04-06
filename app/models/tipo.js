const mongoose = require('mongoose');

const TipoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  activo: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Tipo', TipoSchema);