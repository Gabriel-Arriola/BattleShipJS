const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const authenticateToken = require('../middleware/auth');

router.post('/crear-partida', authenticateToken, gameController.createGame);
router.post('/colocar-barco', authenticateToken, gameController.placeShip);
router.get('/tablero-jugador/:idPartida', authenticateToken, gameController.getPlayerBoard);
router.get('/tablero-maquina/:idPartida', authenticateToken, gameController.getMachineBoard);
router.post('/disparar', authenticateToken, gameController.fireShot);
router.post('/turno-maquina', authenticateToken, gameController.machineTurn);
router.get('/estado-partida/:idPartida', authenticateToken, gameController.getGameStatus);
router.post('/reiniciar-partida', authenticateToken, gameController.restartGame);

module.exports = router;
