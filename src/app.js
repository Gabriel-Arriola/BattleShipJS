const express = require('express');
const gameRoutes = require('./routes/gameRoutes');
const userRoutes = require('./routes/userRoutes');
const { connectDB } = require('./config/database');

const app = express();

app.use(express.json());

// Conectar a la base de datos
connectDB();

// Rutas
app.use('/api/game', gameRoutes);
app.use('/api/user', userRoutes);

module.exports = app;
