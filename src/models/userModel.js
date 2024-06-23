const { getConnection } = require('../config/database');

class UserModel {
  static async create(name, email, hashedPassword) {
    const connection = await getConnection();
    await connection.execute(
      'INSERT INTO jugadores (nombre, email, contraseña) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    );
  }

  static async getByEmail(email) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM jugadores WHERE email = ?',
      [email]
    );
    return rows[0];
  }
}

module.exports = UserModel;