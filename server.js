const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
const db = require('./models');
//evironmental variables
require('dotenv').config()
//Routes
const apiRoutes = require("./routes/api-routes");

//Passport and Session packages & config
const passport = require('passport');
const session = require('express-session');
require('./config/passport')(passport);

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
app.use(express.static("public"));
app.use(express.json());
app.use(apiRoutes);

// app.get('/', (req, res) => {
//     res.send('Hello World!')
// })

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
});
