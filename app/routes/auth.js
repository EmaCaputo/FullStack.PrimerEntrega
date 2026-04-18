const express = require('express');
const AuthController = require('../controllers/authController');
const auth = require('../middleware/auth');

const router = express.Router();


/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar usuario
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado
 *       400:
 *         description: Email ya registrado
*/

router.post('/register', AuthController.register);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 */
router.post('/login', AuthController.login);
router.get('/me', auth, AuthController.me);


module.exports = router;