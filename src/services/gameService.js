const GameModel = require('../models/gameModel');
const gameUtils = require('../utils/gameUtils');

class GameService {
  static async createGame(userId) {
    const playerBoard = gameUtils.createEmptyBoard();
    const machineBoard = gameUtils.generateRandomBoard();
    const gameId = await GameModel.create(userId, playerBoard, machineBoard);
    return { gameId, message: 'Partida creada con éxito' };
  }

  static async placeShip(userId, gameId, size, row, col, horizontal) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }

    const playerBoard = game.tablero_jugador;
    if (!gameUtils.canPlaceShip(playerBoard, row, col, size, horizontal)) {
      throw new Error('No se puede colocar el barco en esa posición');
    }

    gameUtils.placeShip(playerBoard, row, col, size, horizontal);
    await GameModel.updateBoard(gameId, playerBoard, game.tablero_maquina, game.turno_actual, game.puntaje_jugador, game.puntaje_maquina);
    return { message: 'Barco colocado con éxito' };
  }

  static async fireShot(userId, gameId, row, col) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }
    if (game.turno_actual !== 'jugador') {
      throw new Error('No es tu turno');
    }

    const machineBoard = game.tablero_maquina;
    const { hit, updatedBoard } = gameUtils.processShot(machineBoard, row, col);
    let playerScore = game.puntaje_jugador;
    if (hit) {
      playerScore += 10;
    }

    await GameModel.updateBoard(gameId, game.tablero_jugador, updatedBoard, 'maquina', playerScore, game.puntaje_maquina);
    return { 
      message: hit ? 'Impacto exitoso' : 'Disparo fallido',
      puntaje: playerScore,
      siguienteTurno: 'maquina'
    };
  }

  static async machineTurn(userId, gameId) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }
    if (game.turno_actual !== 'maquina') {
      throw new Error('No es el turno de la máquina');
    }

    const playerBoard = game.tablero_jugador;
    const { row, col } = gameUtils.getRandomCoordinates();
    const { hit, updatedBoard } = gameUtils.processShot(playerBoard, row, col);
    let machineScore = game.puntaje_maquina;
    if (hit) {
      machineScore += 10;
    }

    await GameModel.updateBoard(gameId, updatedBoard, game.tablero_maquina, 'jugador', game.puntaje_jugador, machineScore);
    return {
      message: `La máquina disparó en la fila ${row}, columna ${col}`,
      resultado: hit ? 'Impacto' : 'Fallo',
      puntajeMaquina: machineScore,
      siguienteTurno: 'jugador'
    };
  }

  static async getGameStatus(userId, gameId) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }

    const playerBoard = game.tablero_jugador;
    const machineBoard = game.tablero_maquina;

    const playerShipsRemaining = gameUtils.countRemainingShips(playerBoard);
    const machineShipsRemaining = gameUtils.countRemainingShips(machineBoard);

    let status, winner;
    if (playerShipsRemaining === 0) {
      status = 'Finalizada';
      winner = 'Máquina';
    } else if (machineShipsRemaining === 0) {
      status = 'Finalizada';
      winner = 'Jugador';
    } else {
      status = 'En curso';
    }

    return {
      status,
      winner,
      playerScore: game.puntaje_jugador,
      machineScore: game.puntaje_maquina,
      currentTurn: game.turno_actual
    };
  }

  static async restartGame(userId, gameId) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }

    const playerBoard = gameUtils.createEmptyBoard();
    const machineBoard = gameUtils.generateRandomBoard();
    await GameModel.updateBoard(gameId, playerBoard, machineBoard, 'jugador', 0, 0);
    return { message: 'Partida reiniciada' };
  }

  static async getPlayerBoard(userId, gameId) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }
    //return JSON.parse(JSON.stringify(game.tablero_jugador));
    return game.tablero_jugador;
  }

  static async getMachineBoard(userId, gameId) {
    const game = await GameModel.getById(gameId, userId);
    if (!game) {
      throw new Error('Partida no encontrada');
    }
    // Ocultamos los barcos no golpeados de la máquina
    //const machineBoard = JSON.parse(JSON.stringify(game.tablero_maquina));
    const machineBoard = game.tablero_maquina;
    return machineBoard.map(row => 
      row.map(cell => cell === 1 ? 1 : cell)
    );
  }
}

module.exports = GameService;