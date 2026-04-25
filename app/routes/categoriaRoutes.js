const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorias
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: Lista de categorias
 */
router.get('/', categoriaController.listall);

/**
 * @swagger
 * /categorias:
 *   post:
 *     summary: Crear una nueva categoria
 *     tags: [Categorias]
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
 *                 example: Categoria 1
 *     responses:
 *       201:
 *         description: Categoria creada
 *       400:
 *         description: La categoria ya existe
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.post('/', auth, authorize('admin'), categoriaController.create);

/**
 * @swagger
 * /categorias/{key}/{value}:
 *   get:
 *     summary: Obtener una categoria por su clave y valor
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave de la categoria
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor de la categoria
 *     responses:
 *       200:
 *         description: Categoria encontrada
 */
router.get('/:key/:value', categoriaController.find, categoriaController.show);
/**
 * @swagger 
 *  /categorias/{key}/{value}:
 *   put:
 *     summary: Actualizar una categoria por su clave y valor
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave de la categoria
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor de la categoria
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Categoria 1
 *     responses:
 *       200:
 *         description: Categoria actualizada
 */
router.put('/:key/:value', auth, authorize('admin'), categoriaController.find, categoriaController.update);
/**
 * @swagger
 * /categorias/{key}/{value}:
 *   delete:
 *     summary: Eliminar una categoria por su clave y valor
 *     tags: [Categorias]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: key
 *         schema:
 *           type: string
 *         required: true
 *         description: Clave de la categoria
 *       - in: path
 *         name: value
 *         schema:
 *           type: string
 *         required: true
 *         description: Valor de la categoria
 *     responses:
 *       200:
 *         description: Categoria eliminada
 *       400:
 *         description: Categoria no encontrada
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.delete('/:key/:value', auth, authorize('admin'), categoriaController.find, categoriaController.deleted);

module.exports = router;