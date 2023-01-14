const { Sequelize } = require('sequelize');
require('dotenv').config()

var mysql = require('mysql');


// if (process.env.JAWSDB_URL) {
//   connection = mysql.createConnection(process.env.JAWSDB_URL);
// } else {
//   var connection  = new Sequelize("privilegePoints_db", "root", "2Thbrush!", {
//     host: "localhost",
//     port: 3306,
//     dialect: "mysql",
//     pool: {
//       max: 5,
//       min: 0,
//       idle: 10000
//     }
//   });
// }

// // Make connection.
// connection.connect(function(err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });

// var connection = mysql.createConnection({
//   host: process.env.MYSQL_HOST,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   port: "3306"
// })
console.log(process.env.MYSQL_USER)

var sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER,  process.env.MYSQL_PASSWORD, {
  host: process.env.MYSQL_HOST,
  port: 3306,
  dialect: 'mysql',
    dialectModule: require('mysql2'),
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
//   dialectOptions: {
//     ssl:'Amazon RDS'
// },
  pool: { maxConnections: 5, maxIdleTime: 30},
  language: 'en'
});


// connection.connect(function (err) {
//   if (err) {
//     console.error("error connecting: " + err.stack);
//     return;
//   }
//   console.log("connected as id " + connection.threadId);
// });  


// connection.end();

  
// module.exports = sequelize;
module.exports = sequelize;