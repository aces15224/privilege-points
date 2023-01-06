const { Sequelize } = require('sequelize');
// var mysql = require('mysql');


if (process.env.JAWSDB_URL) {
  var connection = mysql.createConnection(process.env.JAWSDB_URL);
  
  connection.connect(function (err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });  
  // connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
  //   if (err) throw err;
  
  //   console.log('The solution is: ', rows[0].solution);
  // });
  
  connection.end();
} else{
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


}



  
module.exports = sequelize;
