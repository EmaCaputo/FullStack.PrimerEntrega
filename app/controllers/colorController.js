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
    if (!req.body.nombre) {
        return res.status(400).send({ message: 'El nombre del color es requerido' });
    }

    Color.findOne({ nombre: req.body.nombre })
        .then(existe => {
            if (existe) {
                return res.status(400).send({ message: 'El nombre del color ya existe' });
            }
            const color = new Color({ nombre: req.body.nombre });
            return color.save()
                .then(colorGuardado => res.status(201).send({ color: colorGuardado }));
        })
        .catch(err => res.status(500).send({ message: err.message }));
}

function show(req, res) {
    if(req.body.error) return res.status(500).send({ message: req.body.error });
    if(!req.body.color) return res.status(404).send({ message: 'Color no encontrado' });
    let color = req.body.color;
    return res.status(200).send({ color });
}

function update(req, res) {
    let color = req.color;

    color = Object.assign(color, req.body);

    color.save()
        .then(color => res.status(200).send({ message: 'Color actualizado', color }))
        .catch(err => res.status(400).send({ message: err.message }));
}

function deleted(req, res) {
    if(req.error) {
        return res.status(500).send({ message: req.error });
    }
    if(!req.color) {
        return res.status(404).send({ message: 'Color no encontrado' });
    }
    req.color.deleteOne()
        .then(() => {
            res.status(200).send({ message: 'Color eliminado' });
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
    Color.findOne(query)
        .then(color => {
            if (!color) {
                return res.status(404).send({ message: 'Color no encontrado' });
            }
            req.color = color;
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