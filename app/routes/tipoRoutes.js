const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');

router.get('/', tipoController.listall);
router.post('/', tipoController.create);
router.get('/:key/:value', tipoController.find, tipoController.show);
router.put('/:key/:value', tipoController.find, tipoController.update);
router.delete('/:key/:value', tipoController.find, tipoController.deleted);

module.exports = router;