const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/userModel');
const { JWT_SECRET } = require('../config/constants');

class UserService {
  static async register(name, email, password) {
    const existingUser = await UserModel.getByEmail(email);
    if (existingUser) {
      throw new Error('El email ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await UserModel.create(name, email, hashedPassword);
  }

  static async login(email, password) {
    const user = await UserModel.getByEmail(email);
    if (!user) {
      throw new Error('Credenciales inválidas');
    }

    const validPassword = await bcrypt.compare(password, user.contraseña);
    if (!validPassword) {
      throw new Error('Credenciales inválidas');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return { token, userId: user.id };
  }
}

module.exports = UserService;