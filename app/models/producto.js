const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
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
     categoria: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Categoria', 
        required: true
    },
    marca:{ 
        type: String, 
        required: true 
    },
    modelo:{ 
        type: String 
    },
    color:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Color',
        required: true
    },
    talle:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        default: 0,
    },
    imagen:{
        type: String,
    }},
    {timestamps: true});


    module.exports = mongoose.model('Producto', productSchema);

