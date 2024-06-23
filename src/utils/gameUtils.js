const { BOARD_SIZE } = require('../config/constants');

class GameUtils {
  static createEmptyBoard() {
    return Array(BOARD_SIZE).fill().map(() => Array(BOARD_SIZE).fill(0));
  }

  static generateRandomBoard() {
    const board = this.createEmptyBoard();
    const ships = [
      { size: 3, count: 2, mod: 'A' },
      { size: 2, count: 3, mod: 'B' },
      { size: 1, count: 4, mod: 'C' }
    ];

    ships.forEach(ship => {
      for (let i = 0; i < ship.count; i++) {
        let placed = false;
        while (!placed) {
          const horizontal = Math.random() < 0.5;
          const row = Math.floor(Math.random() * BOARD_SIZE);
          const col = Math.floor(Math.random() * BOARD_SIZE);

          if (this.canPlaceShip(board, row, col, ship.size, horizontal)) {
            this.placeShip(board, row, col, ship.size, horizontal, ship.mod);
            placed = true;
          }
        }
      }
    });

    return board;
  }

  static canPlaceShip(board, row, col, size, horizontal) {
    if (horizontal) {
      if (col + size > BOARD_SIZE) return false;
      for (let i = 0; i < size; i++) {
        if (board[row][col + i] !== 0) return false;
      }
    } else {
      if (row + size > BOARD_SIZE) return false;
      for (let i = 0; i < size; i++) {
        if (board[row + i][col] !== 0) return false;
      }
    }
    return true;
  }

  static placeShip(board, row, col, size, horizontal, mod) {
    if (horizontal) {
      for (let i = 0; i < size; i++) {
        board[row][col + i] = mod;
      }
    } else {
      for (let i = 0; i < size; i++) {
        board[row + i][col] = mod;
      }
    }
  }

  static processShot(board, row, col) {
    if (board[row][col] === 'A' || board[row][col] === 'B' || board[row][col] === 'C') {
      board[row][col] = 2; // Marcamos como golpeado
      return { hit: true, updatedBoard: board };
    } else {
      board[row][col] = 3; // Marcamos como disparo fallido
      return { hit: false, updatedBoard: board };
    }
  }

  static getRandomCoordinates() {
    return {
      row: Math.floor(Math.random() * BOARD_SIZE),
      col: Math.floor(Math.random() * BOARD_SIZE)
    };
  }

  static countRemainingShips(board) {
    return board.flat().filter(cell => cell === 1).length;
  }

  static formatBoard(board) {
    const symbols = {
      0: '~', // Agua no disparada
      'A': '■', // Barco no golpeado (solo visible en el tablero del jugador)
      'B': '■', // Barco no golpeado (solo visible en el tablero del jugador)
      'C': '■', // Barco no golpeado (solo visible en el tablero del jugador)
      2: 'X', // Barco golpeado
      3: '○'  // Agua disparada (fallo)
    };

    return board.map(row => 
      row.map(cell => symbols[cell]).join(' ')
    ).join('\n');
  }
}

module.exports = GameUtils;