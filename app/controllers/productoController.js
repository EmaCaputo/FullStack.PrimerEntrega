const Producto = require('../models/producto');

//Crear producto
exports.crearProducto = async (req, res) => {
    try {
        const producto = new Producto(req.body);
        const savedProducto = await producto.save();
        res.status(201).json(savedProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Obtener Todos los productos
exports.obtenerProductos = async (req, res) => {
    try {
        const productos = await Producto.find();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Obtener producto por ID
exports.obtenerProductoPorId = async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//Actualizar producto
exports.actualizarProducto = async (req, res) => {
    try {
        const updatedProducto = await Producto.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProducto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json(updatedProducto);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

//Eliminar producto
exports.eliminarProducto = async (req, res) => {
    try {
        const deletedProducto = await Producto.findByIdAndDelete(req.params.id);
        if (!deletedProducto) return res.status(404).json({ message: 'Producto no encontrado' });
        res.status(200).json({ message: 'Producto eliminado' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

