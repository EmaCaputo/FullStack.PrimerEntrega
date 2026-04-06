const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
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

module.exports = mongoose.model('Color', ColorSchema);