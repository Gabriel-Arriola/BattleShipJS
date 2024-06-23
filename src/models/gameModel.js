const { getConnection } = require('../config/database');

class GameModel {
  static async create(userId, playerBoard, machineBoard) {
    const connection = await getConnection();
    const [result] = await connection.execute(
      'INSERT INTO partidas (id_jugador, tablero_jugador, tablero_maquina, turno_actual) VALUES (?, ?, ?, ?)',
      [userId, JSON.stringify(playerBoard), JSON.stringify(machineBoard), 'jugador']
    );
    return result.insertId;
  }

  static async getById(gameId, userId) {
    const connection = await getConnection();
    const [rows] = await connection.execute(
      'SELECT * FROM partidas WHERE id = ? AND id_jugador = ?',
      [gameId, userId]
    );
    return rows[0];
  }

  static async updateBoard(gameId, playerBoard, machineBoard, currentTurn, playerScore, machineScore) {
    const connection = await getConnection();
    await connection.execute(
      'UPDATE partidas SET tablero_jugador = ?, tablero_maquina = ?, turno_actual = ?, puntaje_jugador = ?, puntaje_maquina = ? WHERE id = ?',
      [JSON.stringify(playerBoard), JSON.stringify(machineBoard), currentTurn, playerScore, machineScore, gameId]
    );
  }
}

module.exports = GameModel;