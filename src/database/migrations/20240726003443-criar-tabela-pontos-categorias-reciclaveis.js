'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('pontos_categorias_reciclaveis', {
      ponto_coleta_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'pontos_coleta', 
          key: 'id' 
        },
        allowNull: false,
        onUpdate: 'CASCADE', // se atualizo o ponto_coleta_id, isso atualiza os registros associados a ela na tabela intermediária automaticamente.
        onDelete: 'CASCADE', // se deleto o ponto_coleta_id,os registros associados a ele na tabela intermediária são apagados automaticamente.
      },
      categoria_reciclavel_id: {
        type: Sequelize.INTEGER,
        references: { 
          model: 'categorias_reciclaveis', 
          key: 'id' 
        },
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      }
    });

    // Adicionar chave primária composta
    await queryInterface.addConstraint('pontos_categorias_reciclaveis', { // uso addConstraint para garantir que a combinação de ponto_coleta_id e categoria_reciclavel_id seja único
      fields: ['ponto_coleta_id', 'categoria_reciclavel_id'],
      type: 'primary key',
      name: 'ponto_categoria_reciclavel_pk'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('pontos_categorias_reciclaveis');
  }
};
