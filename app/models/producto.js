const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    nombre: { 
        type: String, 
        required: true 
    },
    tipo: { 
        type: String, 
        required: true,
        enum: ['Remera', 'Jean', 'Zapatilla', 'Campera', 'Camisa', 'Chomba', 'Buzo'] 
    },
     categoria: { 
        type: String, 
        required: true,
        enum: ['ROPA', 'CALZADO'] 
    },
    marca:{ 
        type: String, 
        required: true 
    },
    modelo:{ 
        type: String 
    },
    color:{
        type: String,
        required: true,
        enum: ['NEGRO', 'BLANCO', 'GRIS', 'AZUL', 'ROJO', 'VERDE', 'AMARILLO', 'ROSA', 'MORADO', 'NARANJA']
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

    //Normalizo para que toda entrada quede en mayuscula:

    productSchema.pre('validate', function() {
        if (this.color) this.color = this.color.toUpperCase();
        if (this.talle) this.talle = this.talle.toUpperCase();
    });

    //Valido talle por categoria

    productSchema.pre('save', function() {
        const Talles = {
            ROPA: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            CALZADO: ['35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48']
        };

        const tallesValidos = Talles[this.categoria];

        if (!tallesValidos) {
            throw new Error(`Categoría inválida: ${this.categoria}`);
        }

        if (!tallesValidos.includes(this.talle)) {
            throw new Error(`Talle no válido para la categoría ${this.categoria}`);
        }
    });

    module.exports = mongoose.model('Producto', productSchema);

