const express = require('express');
// const path = require('path');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('../models');
console.log("Worky")
//evironmental variables
require('dotenv').config()
//Routes
const apiRoutes = require("../routes/api-routes");

//Passport and Session packages & config
const passport = require('passport');
const session = require('express-session');
require('../config/passport')(passport);

//session and passport middleware
app.use(
    session({
        secret: process.env.REACT_APP_SESSION,
        resave: false,
        saveUninitialized: false,
        cookie:{
            maxAge: 1000 * 60 * 60 * 24
        }
    })
);
  
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended:true }));
// app.use(express.static("public"));
app.use(express.json());
app.use(apiRoutes);

// app.use(express.static(path.join(__dirname, 'build')));
// app.get('/*', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// Serve up static assets (usually on heroku)
// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static('client/build'));
// }
  
  
// if (process.env.NODE_ENV === 'production') {
//     app.get('*', (_, res) => {
//         res.sendFile(path.join(__dirname, 'client/build/index.html'));
//     });
// }
  
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});

module.exports = app;

