const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController');

router.get('/', productController.listall);
router.post('/', productController.create);
router.get('/:key/:value', productController.find, productController.show);
router.put('/:key/:value', productController.find, productController.update);
router.delete('/:key/:value', productController.find, productController.deleted);

module.exports = router;