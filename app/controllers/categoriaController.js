const Categoria = require('../models/categoria');
const Tipo = require('../models/tipo');

function listall(req, res) {
    Categoria.find()
    .then(categorias => {
        if(categorias.length) return res.status(200).send({ categorias });
        return res.status(204).send({ message: 'No hay categorias para mostrar' });
    })
    .catch(err => res.status(500).send({ message: err.message }));
}

function create(req, res) {
    if (!req.body.nombre) {
        return res.status(400).send({ message: 'El nombre de la categoria es requerido' });
    }

    Categoria.findOne({ nombre: req.body.nombre })
        .then(existe => {
            if (existe) {
                throw new Error('EXISTE'); 
            }
            return Tipo.findById(req.body.tipo);
        })
        .then(tipo => {
            if (!tipo) {
                throw new Error('TIPO_NO_EXISTE'); 
            }

            const categoria = new Categoria(req.body);
            return categoria.save();
        })
        .then(categoriaGuardada => {
            return res.status(201).send({ categoria: categoriaGuardada });
        })
        .catch(err => {
            if (err.message === 'EXISTE') {
                return res.status(400).send({ message: 'La categoria ya existe' });
            }
            if (err.message === 'TIPO_NO_EXISTE') {
                return res.status(400).send({ message: 'El tipo especificado no existe' });
            }
            return res.status(500).send({ message: err.message });
        });
}


function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.categoria) return res.status(404).send({ message: 'Categoria no encontrada' });
    let categoria = req.body.categoria;
    return res.status(200).send({ categoria });
}

function update(req, res) {
    let categoria = req.categoria;

    categoria = Object.assign(categoria, req.body);

    categoria.save()
        .then(categoria => res.status(200).send({ message: 'Categoria actualizada', categoria }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.error) {
        return res.status(500).send({ message: req.error });
    }
    if(!req.categoria) {
        return res.status(404).send({ message: 'Categoria no encontrada' });
    }
    req.categoria.deleteOne()
        .then(() => {
            res.status(200).send({ message: 'Categoria eliminada' });
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
   
    Categoria.findOne(query)
        .then(categoria => {
            if (!categoria) {
                return res.status(404).send({ message: 'Categoria no encontrada' });
            }
            req.categoria = categoria;
            next();
        })
        .catch(err => res.status(500).send({ message: err.message }));

}

module.exports = {
    listall,
    show,
    create,
    update,
    deleted,
    find,
}