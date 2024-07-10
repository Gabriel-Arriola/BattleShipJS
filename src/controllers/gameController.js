const GameService = require('../services/gameService');
const { validationResult } = require('express-validator');

exports.createGame = async (req, res) => {
  try {
    const result = await GameService.createGame(req.user.id);
    res.json(result);
  } catch (error) {
    console.error('Error en createGame:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

exports.placeRandomShip = async (req, res) =>{
  try {
    const {idPartida} = req.body;
    const result = await GameService.placeRandomShip(req.user.id, idPartida);
    res.json(result);
  } catch (error) {
    console.error('Error en createGame:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
}

exports.placeShip = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { idPartida, tamaño, fila, columna, horizontal, modelo } = req.body;

  try {
    const result = await GameService.placeShip(req.user.id, idPartida, tamaño, fila, columna, horizontal, modelo);
    res.json(result);
  } catch (error) {
    console.log("error ", error);

    if (error.message === 'Partida no encontrada' || error.message === 'No se puede colocar el barco en esa posición') {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error en placeShip:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.fireShot = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { idPartida, fila, columna } = req.body;
  try {
    const result = await GameService.fireShot(req.user.id, idPartida, fila, columna);
    res.json(result);
  } catch (error) {
    if (error.message === 'Partida no encontrada' || error.message === 'No es tu turno') {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error en fireShot:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.machineTurn = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { idPartida } = req.body;
  try {
    const result = await GameService.machineTurn(req.user.id, idPartida);
    res.json(result);
  } catch (error) {
    if (error.message === 'Partida no encontrada' || error.message === 'No es el turno de la máquina') {
      res.status(400).json({ error: error.message });
    } else {
      console.error('Error en machineTurn:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.getGameStatus = async (req, res) => {
  const { idPartida } = req.params;
  try {
    const result = await GameService.getGameStatus(req.user.id, idPartida);
    res.json(result);
  } catch (error) {
    if (error.message === 'Partida no encontrada') {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error en getGameStatus:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.restartGame = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { idPartida } = req.body;
  try {
    const result = await GameService.restartGame(req.user.id, idPartida);
    res.json(result);
  } catch (error) {
    if (error.message === 'Partida no encontrada') {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error en restartGame:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.getPlayerBoard = async (req, res) => {
  const { idPartida } = req.params;
  try {
    const board = await GameService.getPlayerBoard(req.user.id, idPartida);
    res.json({ board });
  } catch (error) {
    if (error.message === 'Partida no encontrada') {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error en getPlayerBoard:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};

exports.getMachineBoard = async (req, res) => {
  const { idPartida } = req.params;
  try {
    const board = await GameService.getMachineBoard(req.user.id, idPartida);
    res.json({ board });
  } catch (error) {
    if (error.message === 'Partida no encontrada') {
      res.status(404).json({ error: error.message });
    } else {
      console.error('Error en getMachineBoard:', error);
      res.status(500).json({ error: 'Error interno del servidor' });
    }
  }
};
