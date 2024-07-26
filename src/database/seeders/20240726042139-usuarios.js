'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('usuarios', [{
      nome: 'Renata Pulz',
      sexo: 'feminino',
      cpf: '12345678901',
      senha: 'senha123',
      email: 'renata.pulz@example.com',
      data_de_nascimento: '1989-12-16',
      logradouro: 'Rua Blabla',
      numero: 123,
      complemento: 'Apto 901 B',
      bairro: 'Itacorubi',
      cidade: 'Florianópolis',
      estado: 'SC',
      cep: '88034600',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      nome: 'Júlia Pulz',
      sexo: 'feminino',
      cpf: '12345678902',
      senha: 'senha123',
      email: 'julia.pulz@example.com',
      data_de_nascimento: '2013-11-22',
      logradouro: 'Rua Blabla',
      numero: 123,
      complemento: '',
      bairro: 'Itacorubi',
      cidade: 'Florianópolis',
      estado: 'SC',
      cep: '88034600',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    ], {});
  },

  async down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('usuarios', null, {});
}
};
