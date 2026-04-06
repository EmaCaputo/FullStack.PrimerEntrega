const Color = require('../models/color');

function listall(req, res) {
    Color.find()
        .then(colors => {
            if(colors.length) return res.status(200).send({ colors });
            return res.status(204).send({ message: 'No hay colores para mostrar' });
        })
        .catch(err => res.status(500).send({ message: err.message }));

}

function create(req, res) {
    let color = new Color(req.body);
    color.save()
        .then(color => res.status(201).send({ color }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.color) return res.status(404).send({ message: 'Color no encontrado' });
    let color = req.body.color;
    return res.status(200).send({ color });
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.color) return res.status(404).send({ message: 'Color no encontrado' });
    let color = req.body.color[0];
    color = Object.assign(color, req.body);
    color.save()
        .then(color => res.status(200).send({ message: 'Color actualizado', color }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.color) return res.status(404).send({ message: 'Color no encontrado' });
    req.body.color[0].remove()
        .then(color => {
            res.status(200).send({ message: 'Color eliminado', color }) 
        }).catch(err => res.status(400).send({ message: err.message }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Color.find(query)
        .then(color => {
            if(!color.length) return next();
            req.body.color = color;
            return next();
        }).catch(err => {
            req.body.error = err.message;
            next();
        })
}
/*
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
*/

module.exports = {
    listall,
    show,
    create,
    update,
    deleted,
    find,
}