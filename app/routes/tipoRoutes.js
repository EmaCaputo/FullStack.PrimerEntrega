const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', tipoController.listall);
router.post('/', auth, authorize('admin'), tipoController.create);
router.get('/:key/:value', tipoController.find, tipoController.show);
router.put('/:key/:value', auth, authorize('admin'), tipoController.find, tipoController.update);
router.delete('/:key/:value', auth, authorize('admin'), tipoController.find, tipoController.deleted);

module.exports = router;