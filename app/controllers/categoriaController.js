const Categoria = require('../models/categoria');
const Tipo = require('../models/tipo');

function listall(req, res) {
    Categoria.find()
        .populate('tipo', 'nombre')
        .then(categorias => {
            const response = categorias.map(c => ({
                id: c._id,
                nombre: c.nombre,
                tipo: c.tipo.nombre
            }));

            return res.status(200).send({
                count: response.length,
                categorias: response
            });
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

function create(req, res) {
    const { nombre, tipo } = req.body;

    Tipo.findOne({ nombre: tipo.toUpperCase() })
        .then(tipoDB => {
            if (!tipoDB) {
                throw new Error('Tipo no encontrado');
            }

            const categoria = new Categoria({
                nombre,
                tipo: tipoDB._id
            });

            return categoria.save();
        })
        .then(categoria => res.status(201).send({ categoria }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.categoria) return res.status(404).send({ message: 'Categoria no encontrada' });
    let categoria = req.body.categoria;
    return res.status(200).send({ categoria });
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.categoria) return res.status(404).send({ message: 'Categoria no encontrada' });
    let categoria = req.body.categoria[0];
    categoria = Object.assign(categoria, req.body);
    categoria.save()
        .then(categoria => res.status(200).send({ message: 'Categoria actualizada', categoria }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.categoria) return res.status(404).send({ message: 'Categoria no encontrada' });
    req.body.categoria[0].remove()
        .then(categoria => {
            res.status(200).send({ message: 'Categoria eliminada', categoria }) 
        }).catch(err => res.status(400).send({ message: err.message }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Categoria.find(query)
        .then(categoria => {
            if(!categoria.length) return next();
            req.body.categoria = categoria;
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