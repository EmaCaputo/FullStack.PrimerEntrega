const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.get('/', categoriaController.listall);
router.post('/', categoriaController.create);
router.get('/:key/:value', categoriaController.find, categoriaController.show);
router.put('/:key/:value', categoriaController.find, categoriaController.update);
router.delete('/:key/:value', categoriaController.find, categoriaController.deleted);

module.exports = router;