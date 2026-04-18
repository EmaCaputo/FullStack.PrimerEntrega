const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', productController.listall);
router.post('/', auth, authorize('admin'),productController.create);
router.get('/:key/:value', productController.find, productController.show);
router.put('/:key/:value', auth, authorize('admin'), productController.find, productController.update);
router.delete('/:key/:value', auth, authorize('admin'), productController.find, productController.deleted);

module.exports = router;