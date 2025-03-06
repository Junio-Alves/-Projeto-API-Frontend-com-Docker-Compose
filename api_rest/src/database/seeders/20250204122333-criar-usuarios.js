const bcrypt = require('bcryptjs');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
     await queryInterface.bulkInsert(
      'users', 
      [
        {
          nome: "Luiz",
          email: "luiz1@gmail.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),  
        },
        {
          nome: "Luiz 2",
          email: "luiz 2@gmail.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),  
        },
        {
          nome: "Luiz 3",
          email: "luiz 3@gmail.com",
          password_hash: bcrypt.hashSync("123456", 8),
          created_at: new Date(),
          updated_at: new Date(),  
        },
      ],
       {});
  },

  async down (queryInterface, Sequelize) {
  }
};
