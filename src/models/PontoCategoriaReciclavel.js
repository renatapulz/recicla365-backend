const { DataTypes } = require('sequelize');
const connection = require('../database/connection');
const PontoColeta = require('./PontoColeta');
const CategoriaReciclavel = require('./CategoriaReciclavel');

const PontoCategoriaReciclavel = connection.define('pontos_categorias_reciclaveis', {
  ponto_coleta_id: {
    type: DataTypes.INTEGER,
    references: { 
      model: PontoColeta, 
      key: 'id' 
    },
    allowNull: false
  },
  id_material: {
    type: DataTypes.INTEGER,
    references: { 
      model: CategoriaReciclavel, 
      key: 'id' 
    },
    allowNull: false
  }
});

module.exports = PontoCategoriaReciclavel;
