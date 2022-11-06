module.exports = function(sequelize, DataTypes){
    var Rewards = sequelize.define("Rewards", {
        reward1 : {
            type: DataTypes.STRING,
        },
        reward2 : {
            type: DataTypes.STRING,
        },
        reward3 : {
            type: DataTypes.STRING,
        },
        reward4 : {
            type: DataTypes.STRING,
        },
        reward5 : {
            type: DataTypes.STRING,
        },
        reward6 : {
            type: DataTypes.STRING,
        },
        reward7 : {
            type: DataTypes.STRING,
        },
        reward8 : {
            type: DataTypes.STRING,
        },
        reward9 : {
            type: DataTypes.STRING,
        },
        reward10 : {
            type: DataTypes.STRING,
        },
        familyId:{
            type: DataTypes.STRING,
        },    
    })

    Rewards.associate = function(models){    
        Rewards.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            } 
        })
    };
    return Rewards;  
}

// module.exports = function(sequelize, DataTypes){
//     var Rewards = sequelize.define("Rewards", {
//         description : {
//             type: DataTypes.STRING,
//         },
//         price :{
//             type: DataTypes.INTEGER,
//         },
//         favorite:{
//             type: DataTypes.BOOLEAN,
//             defaultValue: false
//         }
//     })

//     Rewards.associate = function(models){
//         Rewards.hasOne(models.Rewards, {
//             onDelete: "cascade"       
//         });
//         Rewards.hasOne(models.TaskList, {
//             onDelete: "cascade"
//         });
//         Rewards.hasMany(models.UserSecondary)
//     };
//     return Rewards;
    
// }