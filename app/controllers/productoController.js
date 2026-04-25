const Producto = require('../models/producto');

function listall(req, res) {
    Producto.find()
        .then(productos => {
            if(productos.length) return res.status(200).send({ productos });
            return res.status(204).send({ message: 'No hay productos para mostrar' });
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

function create(req, res) {
    if(!req.body.nombre) return res.status(400).send({ message: 'El nombre del producto es requerido' });
    let producto = new Producto(req.body);
    console.log(producto);
    producto.save()
        .then(producto => res.status(201).send({ producto }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.producto) return res.status(404).send({ message: 'Producto no encontrado' });
    let producto = req.body.producto;
    return res.status(200).send({ producto });
}

function update(req, res) {
    let producto = req.producto;

    producto = Object.assign(producto, req.body);

    producto.save()
        .then(producto => res.status(200).send({ message: 'Producto actualizado', producto }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.error) {
        return res.status(500).send({ message: req.error });
    }

    if(!req.producto) {
        return res.status(404).send({ message: 'Producto no encontrado' });
    }

    req.producto.deleteOne()
        .then(() => {
            res.status(200).send({ message: 'Producto eliminado' });
        })
        .catch(err => res.status(400).send({ message: err.message }));
}

function find(req, res, next) {
    const { key, value } = req.params;

    let query = {};

    if (key === 'nombre') {
        query[key] = new RegExp(`^${value}$`, 'i');
    } else {
        query[key] = value;
    }

    Producto.findOne(query)
        .then(producto => {
            if (!producto) {
                return res.status(404).send({ message: 'Producto no encontrado' });
            }

            req.producto = producto;
            next();
        })
        .catch(err => res.status(500).send({ message: err.message }));
}


module.exports = {
    listall,
    create,
    show,
    update,
    deleted,
    find,
}