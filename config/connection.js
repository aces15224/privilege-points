const { Sequelize } = require('sequelize');

var sequelize = new Sequelize("privilegePoints_db", "root", "2Thbrush!", {
    host: "localhost",
    port: 3306,
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
// try {
//     console.log("Connections")
//     sequelize.authenticate();
//     console.log('Connection has been established successfully.');
// } catch (error) {
//     console.error('Unable to connect to the database:', error);
// }
  
module.exports = sequelize;
