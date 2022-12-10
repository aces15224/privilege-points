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