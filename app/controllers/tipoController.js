const Tipo = require('../models/tipo');

function listall(req, res) {
    Tipo.find()
        .then(tipos => {
            if(tipos.length) return res.status(200).send({ tipos });
            return res.status(204).send({ message: 'No hay tipos para mostrar' });
        })
        .catch(err => res.status(500).send({ message: err.message }));

}

function create(req, res) {
    if (!req.body.nombre) {
        return res.status(400).send({ message: 'El nombre del tipo es requerido' });
    }
    Tipo.findOne({ nombre: req.body.nombre })
            .then(existe => {
                if (existe) {
                    return res.status(400).send({ message: 'El nombre del tipo ya existe' });
                }
                const tipo = new Tipo({ nombre: req.body.nombre });
                return tipo.save()
                    .then(tipoGuardado => res.status(201).send({ tipo: tipoGuardado }));
            })
            .catch(err => res.status(500).send({ message: err.message }));
    }


function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.tipo) return res.status(404).send({ message: 'Tipo no encontrado' });
    let tipo = req.body.tipo;
    return res.status(200).send({ tipo });
}

function update(req, res) {
    let tipo = req.tipo;

    tipo = Object.assign(tipo, req.body);

    tipo.save()
        .then(tipo => res.status(200).send({ message: 'Tipo actualizado', tipo }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.error) {
        return res.status(500).send({ message: req.error });
    }
    if(!req.tipo) {
        return res.status(404).send({ message: 'Tipo no encontrado' });
    }
    req.tipo.deleteOne()
        .then(() => {
            res.status(200).send({ message: 'Tipo eliminado' });
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
    Tipo.findOne(query)
        .then(tipo => {
            if (!tipo) {
                return res.status(404).send({ message: 'Tipo no encontrado' });
            }
            req.tipo = tipo;
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