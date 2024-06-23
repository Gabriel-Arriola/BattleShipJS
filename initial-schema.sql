-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS battleship;

-- Usar la base de datos
USE battleship;

-- Crear la tabla de jugadores
CREATE TABLE IF NOT EXISTS jugadores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    contraseña VARCHAR(255) NOT NULL,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear la tabla de partidas
CREATE TABLE IF NOT EXISTS partidas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    id_jugador INT NOT NULL,
    tablero_jugador JSON NOT NULL,
    tablero_maquina JSON NOT NULL,
    turno_actual ENUM('jugador', 'maquina') DEFAULT 'jugador',
    puntaje_jugador INT DEFAULT 0,
    puntaje_maquina INT DEFAULT 0,
    estado ENUM('en_curso', 'finalizada') DEFAULT 'en_curso',
    fecha_inicio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    fecha_actualizacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (id_jugador) REFERENCES jugadores(id)
);

-- Crear índices para mejorar el rendimiento de las consultas
CREATE INDEX idx_jugadores_email ON jugadores(email);
CREATE INDEX idx_partidas_id_jugador ON partidas(id_jugador);
CREATE INDEX idx_partidas_estado ON partidas(estado);

-- Opcionalmente, puedes crear una vista para obtener información resumida de las partidas
CREATE VIEW resumen_partidas AS
SELECT 
    p.id AS id_partida,
    j.nombre AS nombre_jugador,
    p.puntaje_jugador,
    p.puntaje_maquina,
    p.estado,
    p.fecha_inicio,
    p.fecha_actualizacion
FROM 
    partidas p
JOIN 
    jugadores j ON p.id_jugador = j.id;