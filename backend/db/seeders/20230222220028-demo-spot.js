'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: '123 angel street',
        city: 'Los Angeles',
        state: 'California',
        country: 'United States',
        lat: 29.90242,
        lng: -151.05529,
        name: 'Great Place To Stay',
        description: 'This is a great place to stay. Sleep when you can. 5 mins away from the train.',
        price: 250.00,
      },
      {
        ownerId: 1,
        address: '123 San Fernando street',
        city: 'Staten Island',
        state: 'New York',
        country: 'United States',
        lat: 29.90242,
        lng: -151.05529,
        name: 'Cozy Stay',
        description: 'This is a great place to stay. Sleep when you can. 5 mins away from the park.',
        price: 125.00,
      },
      {
        ownerId: 1,
        address: '155 Vanilla street',
        city: 'Jersey City',
        state: 'New Jersey',
        country: 'United States',
        lat: 29.90242,
        lng: -151.05529,
        name: 'Amazing Place To Stay',
        description: 'This is an amazing place to stay. Sleep when you can. 5 mins away from the train.',
        price: 100.00,
      },
      {
        ownerId: 1,
        address: '155 Ainslie street',
        city: 'Brookyln',
        state: 'New York',
        country: 'United States',
        lat: 29.90242,
        lng: -151.05529,
        name: 'Fantastic Place To Stay',
        description: 'This is an fantastic place to stay. Sleep when you can. 5 mins away from the subway.',
        price: 190.00,
      },
      {
        ownerId: 1,
        address: '155 Queens street',
        city: 'Queens',
        state: 'New York',
        country: 'United States',
        lat: 29.90242,
        lng: -151.05529,
        name: 'Place for Kings and Queens',
        description: 'This is a majestic place to stay. Sleep when you can. 5 mins away from various restaurants.',
        price: 250.00,
      },
      {
        ownerId: 2,
        address: '100 street',
        city: 'Dallas',
        state: 'Texas',
        country: 'United States',
        lat: -50.13013,
        lng: 81.57242,
        name: 'Beautiful Home',
        description: 'This is a beautiful home built for you to stay. There are many amenities here.',
        price: 100.00,
      },
      {
        ownerId: 3,
        address: '150 great ave',
        city: 'Manhattan',
        state: 'New York',
        country: 'United States',
        lat: -50.13013,
        lng: 81.57242,
        name: 'Home Away From Home',
        description: 'Welcome to this home away from home. Where you can find yourself and spend time in this great place.',
        price: 150.00,
      },
      {
        ownerId: 2,
        address: '100 San Frances st.',
        city: 'San Francisco',
        state: 'California',
        country: 'United States',
        lat: -50.13013,
        lng: 81.57242,
        name: ' Fully Set Up Cozy Studio',
        description: 'Take it easy at this unique and tranquil getaway. Relax and watch the sunset out the window',
        price: 150.00,
      },
      {
        ownerId: 2,
        address: '100 lake st',
        city: 'Orlando',
        state: 'Florida',
        country: 'United States',
        lat: -50.13013,
        lng: 81.57242,
        name: 'Poolside Hideaway',
        description: 'Your private Poolside Hideaway room has been fully remodeled, with a new private entrance and a pool view.',
        price: 100.00,
      },
      {
        ownerId: 3,
        address: '150 lake ave',
        city: 'Chicago',
        state: 'Illinois',
        country: 'United States',
        lat: -50.13013,
        lng: 81.57242,
        name: 'Beautiful | Cozy 1BR 1BA in Lakeview',
        description: 'Experience Chicago at its best by staying at this spacious and cozy apartment.',
        price: 150.00,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
