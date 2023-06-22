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
        url: 'https://hips.hearstapps.com/hmg-prod/images/1271-saint-ives-place-high-resolution-73-1666640275.jpg',
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
        url: 'https://www.foresthillsrealestate.com/blog/wp-content/uploads/2017/07/IMG_0020-1024x683.jpg',
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
      {
        spotId: 8,
        url: 'https://www.photoshelter.com/img-get2/I0000Pg.xDHKYCxo/sec=wdfsdfoeflwefms1440ed20230624tZTb4GAYyEUp8Y./fill=1680x945/01-500-Folsom-Apartments-For-Rent-San-Francisco.jpg',
        preview: true,
      },
      {
        spotId: 8,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 8,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://a0.muscache.com/im/pictures/fdd0c43c-ed7e-466d-878e-713faa4c3d65.jpg',
        preview: true,
      },
      {
        spotId: 9,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 9,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://a0.muscache.com/im/pictures/miso/Hosting-734869471053388047/original/558a3607-cce1-4970-a6ea-2bb2832f1d0a.jpeg',
        preview: true,
      },
      {
        spotId: 10,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 10,
        url: 'https://t4.ftcdn.net/jpg/03/08/68/19/240_F_308681935_VSuCNvhuif2A8JknPiocgGR2Ag7D1ZqN.jpg',
        preview: false,
      },
      {
        spotId: 10,
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
