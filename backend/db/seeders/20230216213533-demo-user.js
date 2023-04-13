'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, [
      {
        email: 'demo1@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        firstName: 'Mike',
        lastName: 'Tuazon',
      },
      {
        email: 'demo2@user.io',
        username: 'JDoe',
        hashedPassword: bcrypt.hashSync('password2'),
        firstName: 'John',
        lastName: 'Doe'
      },
      {
        email: 'demo3@user.io',
        username: 'STree',
        hashedPassword: bcrypt.hashSync('password3'),
        firstName: 'Sarah',
        lastName: 'Tree'
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Demo-lition', 'JDoe', 'STree'] }
    }, {});
  }
};
