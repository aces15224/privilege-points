const { Sequelize } = require('sequelize');
// var mysql = require('mysql');


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

if (process.env.JAWSDB_URL) {
  connection = mysql.createConnection(process.env.JAWSDB_URL);
  
} else{
  var sequelize = new Sequelize("privilegepoints-db", "admin", "2Thbrush!", {
    host: "privilegepoints-db.cgm3mrs9f9p9.us-east-2.rds.amazonaws.com",
    port: 3306,
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });

  try {
    await connection.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }


}

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});  


connection.end();

  
module.exports = sequelize;
