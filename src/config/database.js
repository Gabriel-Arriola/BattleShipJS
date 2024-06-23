const mysql = require('mysql2/promise');

const dbConfig = {
  host: 'localhost',
  port: '3306',
  user: 'battle',
  password: 'BattleShipJs',
  database: 'battleship'
};

let connection;

async function connectDB() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Conectado a la base de datos MySQL');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
    process.exit(1);
  }
}

function getConnection() {
  if (!connection) {
    throw new Error('La conexión a la base de datos no ha sido establecida');
  }
  return connection;
}

module.exports = { connectDB, connection, getConnection };
