const express = require('express');
const router = express.Router();
const productController = require('../controllers/productoController');
const auth = require('../middleware/auth');
const authorize = require('../middleware/authorize');

/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Listar los productos
 *     tags: [Productos]
 *     responses:
 *       200:
 *         description: Lista de productos
 */
router.get('/', productController.listall);
/**
 * @swagger
 * /productos:
 *   post:
 *     summary: Crear un nuevo producto
 *     tags: [Productos]
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
 *                 example: Producto 1
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               categoriaID:
 *                 type: string
 *                 example: 69e17fb58fb3fe22b6a93f31
 *               colorID:
 *                 type: string
 *                 example: 69e17939cb9479d8329286de
 *               tipoID:
 *                 type: string
 *                 example: 69e17c62157cb11fac5ef8fa
 *               marca:
 *                 type: string
 *                 example: Marca 1
 *               stock:
 *                 type: integer
 *                 example: 100
 *               talle:
 *                 type: string
 *                 example: M
 *     responses:
 *       201:
 *         description: Producto creado
 *       400:
 *         description: El producto ya existe o datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.post('/', auth, authorize('admin'),productController.create);
/**
 * @swagger
 * /productos/{key}/{value}:
 *   get:
 *     summary: Obtener un producto por su clave y valor
 *     tags: [Productos]
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
 *         description: Producto encontrado
 *       400:
 *         description: Producto no encontrado
 */
router.get('/:key/:value', productController.find, productController.show);
/**
 * @swagger
 * /productos/{key}/{value}:
 *   put:
 *     summary: Modificar un producto por su clave y valor
 *     tags: [Productos]
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
 *                 example: Producto 1
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 19.99
 *               categoriaID:
 *                 type: string
 *                 example: 69e17fb58fb3fe22b6a93f31
 *               colorID:
 *                 type: string
 *                 example: 69e17939cb9479d8329286de
 *               tipoID:
 *                 type: string
 *                 example: 69e17c62157cb11fac5ef8fa
 *               marca:
 *                 type: string
 *                 example: Marca 1
 *               stock:
 *                 type: integer
 *                 example: 100
 *               talle:
 *                 type: string
 *                 example: M
 *     responses:
 *       201:
 *         description: Producto modificado
 *       400:
 *         description: Producto no encontrado o datos inválidos
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */
router.put('/:key/:value', auth, authorize('admin'), productController.find, productController.update);
/** 
 * @swagger
 * /productos/{key}/{value}:
 *   delete:
 *     summary: eliminar un producto por su clave y valor
 *     tags: [Productos]
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
 *         description: Producto eliminado
 *       400:
 *         description: Producto no encontrado
 *       401:
 *         description: Token no proporcionado o inválido
 *       403:
 *         description: No autorizado
 */

router.delete('/:key/:value', auth, authorize('admin'), productController.find, productController.deleted);

module.exports = router;