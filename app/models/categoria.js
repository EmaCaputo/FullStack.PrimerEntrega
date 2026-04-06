const mongoose = require('mongoose');

const CategoriaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    unique: true
  },
  tipo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tipo',
    required: true
  },
});

module.exports = mongoose.model('Categoria', CategoriaSchema);