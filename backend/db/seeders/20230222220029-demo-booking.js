'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        userId: 2,
        startDate: "2023-08-01",
        endDate: "2023-08-03",
      },
      {
        spotId: 2,
        userId: 3,
        startDate: "2023-08-02",
        endDate: "2023-08-04",
      },
      {
        spotId: 3,
        userId: 1,
        startDate: "2023-08-03",
        endDate: "2023-08-06",
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Bookings';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
