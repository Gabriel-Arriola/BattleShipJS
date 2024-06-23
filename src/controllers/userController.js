const UserService = require('../services/userService');
const { validationResult } = require('express-validator');

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { nombre, email, contraseña } = req.body;
  try {
    await UserService.register(nombre, email, contraseña);
    res.json({ message: 'Jugador registrado con éxito' });
  } catch (error) {
    if (error.message === 'El email ya está registrado') {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error en register:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, contraseña } = req.body;
  try {
    const result = await UserService.login(email, contraseña);
    res.json(result);
  } catch (error) {
    if (error.message === 'Credenciales inválidas') {
      res.status(401).json({ error: error.message });
    } else {
      console.error('Error en login:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
