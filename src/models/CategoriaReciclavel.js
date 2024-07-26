const { DataTypes } = require('sequelize')
const connection = require('../database/connection')

const CategoriaReciclavel = connection.define('categorias_reciclaveis', {
  tipo_material: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = CategoriaReciclavel