const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');

router.get('/', colorController.listall);
router.post('/', colorController.create);
router.get('/:key/:value', colorController.find, colorController.show);
router.put('/:key/:value', colorController.find, colorController.update);
router.delete('/:key/:value', colorController.find, colorController.deleted);

module.exports = router;