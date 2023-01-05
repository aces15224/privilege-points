const bcrypt = require('bcrypt');
// const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");

const initialize = (passport)=>{
    console.log(passport)
    console.log("getUserByEmail")
    const getUserByEmail = username => db.User.findOne({ where:{ userName: username }})
    

    console.log(getUserByEmail)
    const authenticateUser = async (username, password, done) => {
        console.log("Initialize")

        console.log(username)
        console.log(password)

      const user = await getUserByEmail(username);
      console.log(user)
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
  
        try{
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if (err) { return done(err); }
                if (isMatch) {
                    console.log("pass")
                    return done(null, user);
                } else {
                    console.log("no pass")
                    return done(null, false, { message: 'Password incorrect' });
                }
            })  
        } catch(e){
            console.log(e);
        }
    }
  
    passport.use(new LocalStrategy({ usernameField: 'username' }, authenticateUser))

    passport.serializeUser(function(user, done) {
        done(null, user);
    });
      
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    // passport.serializeUser((user, done) => {
    //     return done(null, user.id)
    // })
    // passport.deserializeUser(async (id, done) => {
    //     const userId = await db.User.findByPk(id)
    //     return done(null, userId)
    // })
}
  
module.exports = initialize