const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const userController = require('../controllers/userController');

router.post('/registro', [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('contraseña').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
], userController.register);

router.post('/login', [
  body('email').isEmail().withMessage('Debe ser un email válido'),
  body('contraseña').notEmpty().withMessage('La contraseña es requerida')
], userController.login);

module.exports = router;