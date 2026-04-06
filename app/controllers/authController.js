const jwt = require('jsonwebtoken');
const User = require('../models/user');
const CONFIG = require('../config');

const AuthController = {
    async register(req, res) {
        try {
            const { email, password, role } = req.body;
            const existing = await User.findOne({ email });
            if (existing) {
                return res.status(400).json({ message: 'Email ya registrado' });
            }
            const user = new User({ email, password, role });
            await user.save();
            res.status(201).json({ message: 'Usuario registrado' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ message: 'Usuario no encontrado' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(400).json({ message: 'Contraseña incorrecta' });
            }
            const token = jwt.sign({ id: user._id, email: user.email, role: user.role },
                CONFIG.JWT_SECRET, 
                { expiresIn: CONFIG.JWT_EXPIRES_IN });

            res.status(200).json({ token });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
};

module.exports = AuthController;