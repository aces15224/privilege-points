module.exports = function(sequelize, DataTypes){
    var Tasks = sequelize.define("Tasks", {
        taskList : {
            type: DataTypes.STRING,
        },
        familyId:{
            type: DataTypes.STRING,
        },  
        history:{
            type: DataTypes.STRING
        },
        favorites:{
            type: DataTypes.STRING,
        }  
    })

    Tasks.associate = function(models){    
        Tasks.belongsTo(models.User,{
            foreignKey: {
                allowNull: false
            } 
        })
    };
    return Tasks;  
}
