'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
  await queryInterface.createTable('tipos_reciclaveis', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    tipo_material: {
      type: Sequelize.STRING,
      allowNull: false
    },
    createdAt: {
      type: Sequelize.DATE,
        allowNull: false,
    },
    updatedAt: {
      type: Sequelize.DATE,
        allowNull: false,
    }
  });
},

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tipos_reciclaveis');
  }
};
