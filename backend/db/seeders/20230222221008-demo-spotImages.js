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
        spotId: 1,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 1,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://pyxis.nymag.com/v1/imgs/654/ef1/0f74752ffc2fd792403ca7b9d566feab20-ATQH-01-Jackson-Heights.rhorizontal.w700.jpg',
        preview: true,
      },
      {
        spotId: 2,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 2,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://patch.com/img/cdn20/users/22969720/20180408/124725/styles/raw/public/processed_images/queens_village_2_realtor-1523205742-6452.jpg?width=1200',
        preview: true,
      },
      {
        spotId: 3,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 3,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://www.brownstoner.com/wp-content/uploads/2019/03/brooklyn-homes-for-sale-bay-ridge-85-78th-street-1.png',
        preview: true,
      },
      {
        spotId: 4,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 4,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://crumrealestate.com/wp-content/uploads/2018/05/House-For-Sale-In-Queens.jpg',
        preview: true,
      },
      {
        spotId: 5,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 5,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://img.gtsstatic.net/reno/imagereader.aspx?imageurl=https%3A%2F%2Fsir.azureedge.net%2F1194i215%2F5aph3tk5b2q5mjj8p3ytqk7jx0i215&option=N&h=472&permitphotoenlargement=false',
        preview: true,
      },
      {
        spotId: 6,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 6,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://ap.rdcpix.com/6f3ccd43b49a2445c8b1a86c19d49d26l-m2836697493od-w480_h360_x2.webp',
        preview: true,
      },
      {
        spotId: 7,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 7,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      spotId: { [Op.in]: [1, 2, 3, 4, 5, 6, 7] }
    }, {});
  }
};
