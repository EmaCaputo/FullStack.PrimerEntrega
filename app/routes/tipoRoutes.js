const express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

/**
 * @swagger
 * /tipos:
 *   get:
 *     summary: Listar todos los tipos
 *     tags: [Tipos]
 *     responses:
 *       200:
 *         description: A list of types
 */
router.get('/', tipoController.listall);
/**
 * @swagger
 * /tipos:
 *   post:
 *     summary: Crear un nuevo tipo
 *     tags: [Tipos]
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
 *                 example: Tipo 1
 *     responses:
 *       201:
 *         description: Tipo creado
 *       400:
 *         description: El tipo ya existe
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.post('/', auth, authorize('admin'), tipoController.create);
/**
 * @swagger
 * /tipos/{key}/{value}:
 *   get:
 *     summary: Obtener un tipo por su clave y valor
 *     tags: [Tipos]
 *     parameters:
 *       - name: key
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: value
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Tipo encontrado
 *       400:
 *         description: Tipo no encontrado
 */
router.get('/:key/:value', tipoController.find, tipoController.show);
/**
 * @swagger
 * /tipos/{key}/{value}:
 *   put:
 *     summary: Actualizar un tipo por su clave y valor
 *     tags: [Tipos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: key
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *       - name: value
*         in: path
*         required: true
*         schema:
*           type: string
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*               nombre:
*                 type: string
*                 example: Tipo 1
*     responses:
*       200:
*         description: Tipo actualizado
*       400:
*         description: Tipo no encontrado
*       401:
*         description: Token no proporcionado o inválido
*       403:
*         description: No autorizado
*/
router.put('/:key/:value', auth, authorize('admin'), tipoController.find, tipoController.update);
/**
* @swagger
* /tipos/{key}/{value}:
*   delete:
*     summary: Eliminar un tipo por su clave y valor
*     tags: [Tipos]
*     security:
*       - bearerAuth: []
*     parameters:
*       - name: key
*         in: path
*         required: true
*         schema:
*           type: string
*       - name: value
*         in: path
*         required: true
*         schema:
*           type: string
*     responses:
*       200:
*         description: Tipo eliminado
*       400:
*         description: Tipo no encontrado
*       401:
*         description: Token no proporcionado o inválido
*       403:
*         description: No autorizado
*/
router.delete('/:key/:value', auth, authorize('admin'), tipoController.find, tipoController.deleted);

module.exports = router;