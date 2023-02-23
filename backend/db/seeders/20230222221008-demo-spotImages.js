'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    return queryInterface.bulkInsert(options, [
      {
        spotId: 1,
        url: 'https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/home-improvement/wp-content/uploads/2022/07/download-23.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://pyxis.nymag.com/v1/imgs/654/ef1/0f74752ffc2fd792403ca7b9d566feab20-ATQH-01-Jackson-Heights.rhorizontal.w700.jpg',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://patch.com/img/cdn20/users/22969720/20180408/124725/styles/raw/public/processed_images/queens_village_2_realtor-1523205742-6452.jpg?width=1200',
        preview: true,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3] }
    }, {});
  }
};
