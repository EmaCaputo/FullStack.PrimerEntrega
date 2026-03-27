const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController');

router.get('/', productController.obtenerProductos);
router.get('/:id', productController.obtenerProductoPorId);
router.post('/', productController.crearProducto);
router.put('/:id', productController.actualizarProducto);
router.delete('/:id', productController.eliminarProducto);

module.exports = router;