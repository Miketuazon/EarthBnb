'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    return queryInterface.bulkInsert(options, [
      {
       spotId: 1,
       userId: 2,
       review: 'It was an alright place',
       stars: 3,
      },
      {
        spotId: 2,
        userId: 3,
        review: 'I wish the microwave worked!!!',
        stars: 1,
       },
       {
        spotId: 2,
        userId: 2,
        review: 'The microwave works and it is a wonderful place.',
        stars: 5,
       },
       {
        spotId: 3,
        userId: 3,
        review: 'Fantastic place',
        stars: 5,
       },
       {
        spotId: 6,
        userId: 1,
        review: 'Great place to stay',
        stars: 5,
       },
       {
        spotId: 7,
        userId: 1,
        review: 'Fantastic place',
        stars: 5,
       },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
