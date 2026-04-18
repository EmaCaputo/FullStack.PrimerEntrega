const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', categoriaController.listall);
router.post('/', auth, authorize('admin'), categoriaController.create);
router.get('/:key/:value', categoriaController.find, categoriaController.show);
router.put('/:key/:value', auth, authorize('admin'), categoriaController.find, categoriaController.update);
router.delete('/:key/:value', auth, authorize('admin'), categoriaController.find, categoriaController.deleted);

module.exports = router;