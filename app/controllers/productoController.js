const Tipo = require('../models/tipo');
const Categoria = require('../models/categoria');
const Color = require('../models/color');   
const Producto = require('../models/producto');

function listall(req, res) {
    Producto.find()
        .populate('color', 'nombre')
        .populate('tipo', 'nombre')
        .populate('categoria', 'nombre')
        .then(productos => {
            if (!productos.length) {
                return res.status(204).send({ message: 'No hay productos para mostrar' });
            }

            const response = productos.map(p => ({
                id: p._id,
                nombre: p.nombre,
                color: p.color ? p.color.nombre : null,
                tipo: p.tipo ? p.tipo.nombre : null,
                categoria: p.categoria ? p.categoria.nombre : null,
                marca: p.marca,
                modelo: p.modelo,
                talle: p.talle,
                precio: p.precio,
                stock: p.stock,
                imagen: p.imagen,
            }));

            return res.status(200).send({
                count: response.length,
                productos: response
            });
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

function create(req, res) {
    /*let producto = new Producto(req.body);
    producto.save()
        .then(producto => res.status(201).send({ producto }))
        .catch(err => res.status(400).send({ message: err.message }));
}*/

    const { tipo, categoria, color, ...rest } = req.body;

    Promise.all([
        Tipo.findOne({ nombre: tipo.toUpperCase() }),
        Categoria.findOne({ nombre: categoria }),
        Color.findOne({ nombre: color })
    ])
    .then(async ([tipoDB, categoriaDB, colorDB]) => {

        if (!tipoDB) throw new Error('Tipo no encontrado');
        if (!categoriaDB) throw new Error('Categoría no encontrada');
        if (!colorDB) throw new Error('Color no encontrado');

        let producto = new Producto({
            ...rest,
            tipo: tipoDB._id,
            categoria: categoriaDB._id,
            color: colorDB._id
        });

       let producto1 = producto.save();
        res.status(201).send({ producto1 });
    })
    .catch(err => res.status(400).send({ message: err.message }));
}


function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.producto) return res.status(404).send({ message: 'Producto no encontrado' });
    let producto = req.body.producto;
    return res.status(200).send({ producto });
}

function update(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.producto) return res.status(404).send({ message: 'Producto no encontrado' });
    let producto = req.body.producto[0];
    producto = Object.assign(producto, req.body);
    producto.save()
        .then(producto => res.status(200).send({ message: 'Producto actualizado', producto }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.producto) return res.status(404).send({ message: 'Producto no encontrado' });
    req.body.producto[0].remove()
        .then(producto => {
            res.status(200).send({ message: 'Producto eliminado', producto }) 
        }).catch(err => res.status(400).send({ message: err.message }));
}

function find(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value
    Producto.findOne(query)
        .then(producto => {
            if(!producto) return next();
            req.body.producto = producto;
            return next();
        }).catch(err => {
            req.body.error = err.message;
            next();
        })
}

function findOne(req, res, next) {
    let query = {};
    query[req.params.key] = req.params.value;
    Producto.findOne(query)
        .then(producto => {
            if(!producto) return next();
            req.body.producto = producto;
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
    findOne,
}