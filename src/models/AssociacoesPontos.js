const PontoColeta = require('./PontoColeta');
const CategoriaReciclavel = require('./CategoriaReciclavel');
const PontoCategoriaReciclavel = require('./PontoCategoriaReciclavel');

// Definindo as associações dos pontos de coleta
PontoColeta.belongsToMany(CategoriaReciclavel, {
  through: PontoCategoriaReciclavel,
  foreignKey: 'ponto_coleta_id',
  otherKey: 'categoria_reciclavel_id'
});

CategoriaReciclavel.belongsToMany(PontoColeta, {
  through: PontoCategoriaReciclavel,
  foreignKey: 'categoria_reciclavel_id',
  otherKey: 'ponto_coleta_id'
});

module.exports = { PontoColeta, CategoriaReciclavel, PontoCategoriaReciclavel };
