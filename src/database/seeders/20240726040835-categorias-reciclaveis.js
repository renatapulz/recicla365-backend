'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('categorias_reciclaveis', [
      { tipo_material: 'papel e papelao', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'plastico', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'vidro', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'metal', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'organico', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'eletronicos', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'madeira', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'oleo', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'pilha', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'entulho', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'moveis', createdAt: new Date(), updatedAt: new Date() },
      { tipo_material: 'roupas e brinquedos', createdAt: new Date(), updatedAt: new Date() }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('categorias_reciclaveis', null, {});
  }
};
