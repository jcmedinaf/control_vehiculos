CREATE DATABASE IF NOT EXISTS control_carros;

USE control_carros;

CREATE TABLE IF NOT EXISTS usuarios(
    idUsuario   INT AUTO_INCREMENT PRIMARY KEY,
    usuario     VARCHAR(50)  NOT NULL UNIQUE,
    clave       VARCHAR(255) NOT NULL,
    nombre      VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS vehiculos (
    idVehiculo  INT AUTO_INCREMENT PRIMARY KEY,
    marca       VARCHAR(50) NOT NULL,
    modelo      VARCHAR(50) NOT NULL,
    annio       INT NOT NULL,
    placa       VARCHAR(20) NOT NULL UNIQUE,
    creado_el   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (usuario, clave, nombre) VALUES ('admin','admin','administrador');