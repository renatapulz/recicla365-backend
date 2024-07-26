const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const Usuario = connection.define("usuarios", {
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    sexo: {
        type: DataTypes.ENUM('feminino', 'masculino', 'outro'),
        allowNull: false
    },
    cpf: {
        type: DataTypes.CHAR(11),
        allowNull: false,
        unique: true
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    data_de_nascimento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    logradouro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    complemento: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bairro: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    estado: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cep: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Usuario