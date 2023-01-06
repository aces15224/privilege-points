const express = require("express");
const Router = express.Router();
const db = require("../models");

//Bcyrpt library used for encrypting passwords
const bcrypt = require('bcryptjs');

//Passport library and configuration (used for Authentication)
const passport = require('passport');
const initializePassport = require('../config/passport');

//Intialize passport.  Find user's username.
initializePassport(passport);
  
  //CheckAuth checks if there is user and sets user to the user's businessName
  //This will be called when the user visits pages that require authentication
Router.get("/api/checkAuthentication", (req, res) => {
    const authenticated= typeof req.user !== 'undefined';
    if(authenticated){
        console.log("user =>")
        const user = req.user.userName;
        console.log(user)

        res.json({authenticated, user})    
    } else{
        res.json({authenticated})
    }
});

//Log user out and destroy session
Router.get("/api/logout", (req, res)=>{
    req.session.destroy(function (err) {
        //Redirect to login page after logging out
        res.redirect('/login');
    });
});

// Check Password for Login Authentication
Router.post('/api/login', async (req, res, next) => {
    let userName = req.body.username;
    //Find user with userName provided in req.body...
    console.log("POST #1")
    const user = db.User.findOne({where:{userName : userName}});
    await user
    .then(data => {
        console.log("returned user #2")
        //call passport authentication and...
        passport.authenticate('local', function(err, user, info) {
            console.log("user #3")

            console.log(user)
            if (err) { return next(err); }
            if (!user) { 
                //if no user, redirect to the login page
                console.log("fail")
                return res.redirect('/login'); 
            }
            //otherwise log the user in and redirect them to their dashboard
            req.logIn(user, function(err) {
                console.log("success")
                if (err) { 
                  console.log("err")
                  return next(err); 
                }
                console.log("redirect")
              return res.redirect(`/dashboard/tasks/${data.dataValues.userName}`);
            });
        })(req, res, next)
    })
    .catch(err => console.log(err));    
});







///passport^^^^



Router.route("/dashboard/:userName")
.get(async (req,res)=>{
    //Get user information using their userName
    const {userName} = req.params;
    // console.log(userName)
    //remove non-letters from userName
    const _userName = userName.split("%20").join(" ");
    await db.User.findOne({
        where:{
            userName: _userName
        },
        include:[db.Tasks, db.Rewards]      
    })
    .then(function(results) {
        // console.log("RES")
        res.json(results);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
})

Router.route('/password')
.post((req, res)=>{
    const password = req.body.password;
    const userName = req.body.userName;
    console.log(userName)
    //find user using business name
    db.User.findOne({
        where:{
            userName: userName
        }
    })
    .then(function(data){
    // if user exists compare typed passsword w/ encrypted password stored in database
        if(data){
            bcrypt.compare(password, data.password, (err, password)=>{
                if (err) {console.log(err)}
                if (password) {
                    res.json(password) 
                } else {
                    res.json(password)  
                }
            });
        }
        else{
            return false;
        }   
    }) 
    .catch(err => console.log(err));   
})
.put((req, res)=>{
    let password = req.body.password;
    const userName = req.body.userName;
    //encrypt password and update the database w/ new password
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;
            console.log(hash)
            password = hash;
            db.User.update({
                password: password
            },{
                where:{
                    userName: userName
                }
            })
            .then(function(data){
                res.json(data)
            }) 
            .catch(err => console.log(err));  
        });
    });  
})




// Router.route("/users1")
// .post((req, res) =>{
//     // Router.post("/users", (req, res) =>{
//     const user = {
//         userName: req.body.userName,
//         familyId: req.body.familyId,
//         accessId: req.body.accessId,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//     }
    
//         //creating a user.  A new password must be encypted...
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) throw err;
//                 user.password = hash;
//                 //and the user will be added to the database
//                 db.User.create(user)
//                 .then(function(data){
//                     console.log(data)
//                 }) 
//                 .catch(err => console.log(err));    
//             });
//         });
       
// });
// .get(async (req, res)=>{
//     await db.User.findAll({
//         where:{
//             accessId: 
//         },
//         include:[db.Tasks, db.Rewards]      
//     })
//     .then(function(results) {
//         // console.log("RES")
//         res.json(results);
//     })
//     .catch((error) => {
//         console.error('Error:', error);
//     });
//     db.User.findAll({include:[db.Tasks, db.Rewards]}).then(function(establishment) {
//         // console.log(establishment)
//         res.json(establishment);
//     })
// })
Router.route("/family")
.post(async (req, res)=>{
    const userCheck = req.body.userCheck;
    if(userCheck){
        const id = req.body.userName;
        await db.User.findAll({
            where:{
                userName: id
            },
        })
        .then(function(results) {
            // console.log("RES")
            res.json(results);
        })
        .catch((error) => {
            console.error('Error:', error);
        });  

    } else{
        const id = req.body.familyId;
        await db.User.findAll({
            where:{
                accessId: id
            },
        })
        .then(function(results) {
            // console.log("RES")
            res.json(results);
        })
        .catch((error) => {
            console.error('Error:', error);
        });    
    }
})
.put(async (req, res)=>{
    const {userName, firstName, lastName, email, familyId } = req.body;
    await db.User.update({
        userName, 
        firstName, 
        lastName, 
        email
    },{
        where:{
            familyId: familyId
        }
    })
    .then(function(data){
        console.log(data)
        res.json(data)
    }) 
    .catch(err => console.log(err));
})
.delete(async (req, res)=>{
    //remove non-letters from name
    const id = req.body.familyId;
    db.User.destroy({
        where:{
            familyId : id
        }        
    })
    .then(function(results) {
        console.log("Prices Deleted")
 
        // const {name} = req.params;
        // //remove non-letters from name
        // const establishmentName = name.split("%20").join(" ");
        // //after deleting price, the business table must be updated to reflect changes. ("Delivery Offered: False")
        // db.Establishment.update({
        //     delivery: false
        // },{
        //     where:{
        //         businessName : establishmentName
        //     }
        // })
        // .then(function(data){
        //     console.log("Service Removed")
        //     res.json(data)
        // })    
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});

Router.route("/users")
.post((req, res) =>{
    // Router.post("/users", (req, res) =>{
    const email = req.body.email;
    const primary = req.body.primary;
    console.log(req.body.familyId)
    console.log(primary)
    const id = `${req.body.userName}+${Date.now()}`
    const body = Object.keys(req.body);
    const user = {
        email,
        permission: primary,
        userName: req.body.userName,
        familyId: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    }
    if(primary === false){
        user.accessId = req.body.accessId;
        // user.permission = false;
    }    
    console.log(user)
    //If body.includes(firstName) the user is submitting user info to database and...
    if(body.includes('firstName')){
        //creating a user.  A new password must be encypted...
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                //and the user will be added to the database
                db.User.create(user)
                .then(function(data){
                    if(primary === true){
                        db.Tasks.create({UserFamilyId: id, familyId: id})
                        .then((data)=>{
                            db.Rewards.create({UserFamilyId: id, familyId: id})
                            .then((data)=>{
                                res.json(data)
                            }).catch(err => console.log(err));
                        }).catch(err => console.log(err));    
                    } else{
                        console.log(data)
                        res.json(data)
                    }  
                }) 
                .catch(err => console.log(err));    
            });
        });
    } else{
        // If !body.includes(firstName) the user is checking database for existing user info
        db.User.findOne({
            where:{
                email : email
            }
        })
        .then(function(results) {
            if(results){
                console.log("Email Already Taken")
            }
            //send results back and check for errors
            res.json(results)
        })
        .catch(err => console.log(err))    
    }    
})
.put((req, res)=>{
    const {ppts, userName, firstName, lastName, email, prevMail } = req.body;
    if(ppts){
        db.User.update({
            pPts: ppts
        },{
            where:{
                userName: userName
            }
        })
        .then(function(data){
            res.json(data)
        }) 
        .catch(err => console.log(err));
    } else{
        db.User.update({
            userName, 
            firstName, 
            lastName, 
            email
        },{
            where:{
                email: prevMail
            }
        })
        .then(function(data){
            res.json(data)
        }) 
        .catch(err => console.log(err));
    }
})

Router.route("/tasks/:id")
.get((req, res)=>{
    const {id} = req.params;
    db.User.findOne({
        where:{ familyId: id},
        include:[db.Tasks, db.Rewards]})
    .then(function(establishment) {
        res.json(establishment);
    })
    .catch(err => console.log(err)); 
})
.put((req, res)=>{
    const {id} = req.params;
    console.log(id)
    const {taskList, type, favorites} = req.body;
    if(type === "task"){
        db.Tasks.update({taskList},{
            where:{
                familyId: id
            }
            
        })
        .then(function(data){
            res.json(data)
        }) 
        .catch(err => console.log(err)); 
    } else{
        db.Tasks.update({
            favorites, 
            taskList
        },{
            where:{
                familyId: id
            }
        })
        .then(function(data){
            res.json(data)
        }) 
        .catch(err => console.log(err));

    }
    

})


Router.route("/rewards/:id")
.get((req, res)=>{
    const {id} = req.params;
    console.log("id")
        console.log(id)


    db.User.findOne({
        where:{ familyId: id},
        include:[db.Rewards]})
    .then(function(establishment) {
        res.json(establishment);
    })
    .catch(err => console.log(err)); 
})
.put((req, res)=>{
    const {id} = req.params;
    const {RewardList} = req.body;
    db.Rewards.update({RewardList},{
        where:{
            familyId: id
        }   
    })
    .then(function(data){
        console.log(data)
        res.json(data)
    }) 
    .catch(err => console.log(err));  

})
// .post((req, res)=>{

// })

// .post((req, res) =>{
//     // Router.post("/users", (req, res) =>{
//     let email = req.body.email;
//     const id = `${req.body.userName}+${Date.now()}`
//     const body = Object.keys(req.body);
//     const user = {
//         email,
//         permission: true,
//         userName: req.body.userName,
//         familyId: id,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//         password: req.body.password,
//     }
//     //If body.includes(firstName) the user is submitting user info to database and...
//     if(body.includes('firstName')){
//         //creating a user.  A new password must be encypted...
//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(user.password, salt, (err, hash) => {
//                 if (err) throw err;
//                 user.password = hash;
//                 //and the user will be added to the database
//                 db.User.create(user)
//                 .then(function(data){
//                     db.Tasks.create({UserFamilyId: id, familyId: id})
//                     .then((data)=>{
//                         db.Rewards.create({UserFamilyId: id, familyId: id})
//                         .then((data)=>{
//                             res.json(data)
//                         }).catch(err => console.log(err));
//                     }).catch(err => console.log(err));
//                 }) 
//                 .catch(err => console.log(err));    
//             });
//         });
//     } else{
//         // If !body.includes(firstName) the user is checking database for existing user info
//         db.User.findOne({
//             where:{
//                 email : email
//             }
//         })
//         .then(function(results) {
//             if(results){
//                 console.log("Email Already Taken")
//             }
//             //send results back and check for errors
//             res.json(results)
//         })
//         .catch(err => console.log(err))    
//     }    
// });
module.exports = Router;


