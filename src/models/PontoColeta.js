const { DataTypes } = require('sequelize')
const connection = require('../database/connection')
const Usuario = require('./Usuario')
const CategoriaReciclavel = require('./CategoriaReciclavel');
const PontoCategoriaReciclavel = require('./PontoCategoriaReciclavel');

const PontoColeta = connection.define('pontos_coleta', {
    usuario_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Usuario,
            key: 'id'
        },
        allowNull: false
    },
    nomePonto: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricaoPonto: {
        type: DataTypes.STRING,
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
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    url_google_maps: {
        type: DataTypes.TEXT,
        allowNull: true
    }
});
PontoColeta.belongsToMany(CategoriaReciclavel, {
    through: PontoCategoriaReciclavel,
    as: 'categoriasReciclaveis',
    foreignKey: 'ponto_coleta_id',
    otherKey: 'categoria_reciclavel_id'
});

module.exports = PontoColeta