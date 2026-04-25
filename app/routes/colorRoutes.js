const express = require('express');
const router = express.Router();
const colorController = require('../controllers/colorController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

/**
 * @swagger
 * /colores:
 *   get:
 *     summary: Obtener todos los colores
 *     tags: [Colores]
 *     responses:
 *       200:
 *         description: Lista de colores
 */
router.get('/', colorController.listall);

/**
 * @swagger
 * /colores:
 *   post:
 *     summary: Crear un nuevo color
 *     tags: [Colores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Color 1
 *     responses:
 *       201:
 *         description: Color creado
 *       400:
 *         description: El color ya existe
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.post('/', auth, authorize('admin'),colorController.create);
/**
 * @swagger 
 * /colores/{key}/{value}:
 *   get:
 *     summary: Obtener un color por su clave y valor
 *     tags: [Colores]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave del color
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor del color
 *     responses:
 *       200:
 *         description: Color encontrado
 *       400:
 *         description: Color no encontrado
 */
router.get('/:key/:value', colorController.find, colorController.show);
/**
 * @swagger 
 *  /colores/{key}/{value}:
 *   put:
 *     summary: Actualizar un color por su clave y valor
 *     tags: [Colores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave del color
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor del color
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Color 1
 *     responses:
 *       200:
 *         description: Color actualizado
 *       400:
 *         description: Color no encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.put('/:key/:value', auth, authorize('admin'), colorController.find, colorController.update);
/**
 * @swagger
 * /colores/{key}/{value}:
 *   delete:
 *     summary: Eliminar un color por su clave y valor
 *     tags: [Colores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave del color
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor del color
 *     responses:
 *       200:
 *         description: Color eliminado
 *       400:
 *         description: Color no encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.delete('/:key/:value', auth, authorize('admin'), colorController.find, colorController.deleted);

module.exports = router;