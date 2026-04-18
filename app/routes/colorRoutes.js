const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

router.get('/', colorController.listall);
router.post('/', auth, authorize('admin'),colorController.create);
router.get('/:key/:value', colorController.find, colorController.show);
router.put('/:key/:value', auth, authorize('admin'), colorController.find, colorController.update);
router.delete('/:key/:value', auth, authorize('admin'), colorController.find, colorController.deleted);

module.exports = router;