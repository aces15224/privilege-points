const express = require("express");
const Router = express.Router();
const db = require("../models");
//Bcyrpt library used for encrypting passwords
const bcrypt = require('bcryptjs');


// Router.route("/tasks")
// .get((req, res)=>{
//     db.Tasks.findOne({
//         where:{
//             familyId : 6666
//         }
//     })
//     .then(function(data){
//         console.log(data)
//         res.json(data)

//         // if user exists compare typed passsword w/ encrypted password stored in database
//         // if(data){
//         //     bcrypt.compare(password, data.password, (err, password)=>{
//         //         if (err) {console.log(err)}
//         //         if (password) {
//         //             res.json(password) 
//         //         } else {
//         //            res.json(password)  
//         //         }
//         //     });
//         // }
//         // else{
//         //     return false;
//         // }   
//     }) 
//     .catch(err => console.log(err));  
// })
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
Router.route("/users1")
.post((req, res) =>{
    // Router.post("/users", (req, res) =>{
    const user = {
        userName: req.body.userName,
        familyId: req.body.familyId,
        accessId: req.body.accessId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    }
    
        //creating a user.  A new password must be encypted...
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                if (err) throw err;
                user.password = hash;
                //and the user will be added to the database
                db.User.create(user)
                .then(function(data){
                    console.log(data)
                }) 
                .catch(err => console.log(err));    
            });
        });
       
});
Router.route("/users")
.get((req, res)=>{
    db.User.findAll({include:[db.Tasks, db.Rewards]}).then(function(establishment) {
        // console.log(establishment)
        res.json(establishment);
    })
})
.post((req, res) =>{
    // Router.post("/users", (req, res) =>{
    let email = req.body.email;
    const id = `${req.body.userName}+${Date.now()}`
    const body = Object.keys(req.body);
    const user = {
        email,
        permission: true,
        userName: req.body.userName,
        familyId: id,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
    }
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
                    db.Tasks.create({UserFamilyId: id, familyId: id})
                    .then((data)=>{
                        db.Rewards.create({UserFamilyId: id, familyId: id})
                        .then((data)=>{
                            res.json(data)
                        }).catch(err => console.log(err));
                    }).catch(err => console.log(err));
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
    const {ppts, userName} = req.body;
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

})

Router.route("/tasks/:id")
.get((req, res)=>{
    const {id} = req.params;
    console.log("id")
        console.log(id)


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
        db.Tasks.update({favorites},{
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