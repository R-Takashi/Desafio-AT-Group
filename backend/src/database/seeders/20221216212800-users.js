'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('Users', [
      {
        id: 1,
        nome: 'User1',
        email: 'usuario1@teste.com',
        senha: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        data_de_nascimento: '2000-01-01',
          // senha: secret_user
      },
      {
        id: 2,
        nome: 'User2',
        email: 'usuario2@teste.com',
        senha: '$2a$08$Y8Abi8jXvsXyqm.rmp0B.uQBA5qUz7T6Ghlg/CvVr/gLxYj5UAZVO',
        data_de_nascimento: '2010-01-02',
          // senha: secret_user
      },
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
