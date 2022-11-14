module.exports = function(sequelize, DataTypes){
    var Rewards = sequelize.define("Rewards", {
        RewardList : {
            type: DataTypes.STRING,
        },
        familyId:{
            type: DataTypes.STRING,
        },
        favorites:{
            type: DataTypes.STRING,
        }, 
        history:{
            type: DataTypes.STRING
        }     
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