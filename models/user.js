module.exports = function(sequelize, DataTypes){
    var User = sequelize.define("User", {
        firstName : {
            type: DataTypes.STRING,
        },
        lastName :{
            type: DataTypes.STRING,
        },
        userName:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        permission:{
            type:DataTypes.BOOLEAN,
            defaultValue:false
        },
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len: [1,100],
                isEmail: true, 
            },
        },
        familyId:{
            type: DataTypes.STRING,
            primaryKey: true,
        },
        password:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                len:[5,65]
            }
        },
        createdAt:{
            type:DataTypes.DATE

        }, 
        updatedAt:{
            type:DataTypes.DATE
        } 
    })

    User.associate = function(models){
        // User.belongsToMany(models.Rewards, {
        //     through: models.RewardUnit

        // });
        // User.belongsToMany(models.Tasks, {
        //     through: models.TaskUnit
        // })
        User.hasOne(models.Tasks, {
            onDelete: "cascade"       
        });
        User.hasOne(models.Rewards, {
            onDelete: "cascade"
        });
      
    };
    return User;
    
}