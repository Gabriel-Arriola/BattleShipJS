# BattleShipJS
Proyecto backend codo a codo

# Requisitos
* Node version 18 o superior
* Mysql DB

# Puesta en marcha
## Base de Datos 
* Instalar Mysql 
* OPCIONAL: en caso de tener DOCKER se puede ejecutar docker-compose para levantar la base de datos por ese medio
* Ejecutar initial-schema.sql para recrear las tablas

## Node
* Ejecutar npm install para instalar todas las dependencias incluidas en el proyecto


# Detalle de Funcionalidades

* /api/user/registro -> Dar de alta nuevos usuarios
* /api/user/login -> Login la sistema, retorna tocken de sesion

* /api/game/crear-partida -> Genera la partida, inicializa el tablero del jugador y completa el de la maquina con elementos de forma aleatoria
* /api/game/colocar-barco-random -> Completa el tablero del jugador con elementos de forma aleatoria
* /api/game/colocar-barco -> Completa el tablero del jugador con elementos posicionados manualmente
* /api/game/tablero-jugador/:idPartida -> muestra el detalle del tablero del jugador para una partida determinada
* /api/game/tablero-maquina/:idPartida -> muestra el detalle del tablero de la maquina para una partida determinada
* /api/game/disparar -> Evento de disparo del jugador a una posicion especifica del tablero enemigo
* /api/game/turno-maquina -> Evento de disparo de la maquina a una posicion aleatoria del tablero enemigo
* /api/game/estado-partida/:idPartida -> Muestra un informe del estado general del juego
* /api/game/reiniciar-partida -> Reinicia los tableros de una partida determinada dejando la partida en un estado similar al que obtenemos desde /crear-partida


# POSTMAN
* Se adjunta un json con los endpoints para el testeo de los mismos, se debe tener la precaucion de actualizar el token de sesion.
