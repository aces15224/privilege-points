const bcrypt = require('bcrypt');
// const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const db = require("../models");

const initialize = (passport, getUserByEmail)=>{
    const authenticateUser = async (email, password, done) => {
      const user = await getUserByEmail(email);
      if (user == null) {
        return done(null, false, { message: 'No user with that email' })
      }
  
        try{
            bcrypt.compare(password, user.password, (err, isMatch)=>{
                if (err) { return done(err); }
                if (isMatch) {
                    // console.log("pass")
                    return done(null, user);
                } else {
                    return done(null, false, { message: 'Password incorrect' });
                }
            })  
        } catch(e){
            console.log(e);
        }
    }
  
    passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => {
        return done(null, user.id)
    })
    passport.deserializeUser(async (id, done) => {
        const userId = await db.BusinessUser.findByPk(id)
        return done(null, userId)
    })
}
  
module.exports = initialize