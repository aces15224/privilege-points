module.exports = function(sequelize, DataTypes){
    var Tasks = sequelize.define("Tasks", {
        task1 : {
            type: DataTypes.STRING,
        },
        task2 : {
            type: DataTypes.STRING,
        },
        task3 : {
            type: DataTypes.STRING,
        },
        task4 : {
            type: DataTypes.STRING,
        },
        task5 : {
            type: DataTypes.STRING,
        },
        task6 : {
            type: DataTypes.STRING,
        },
        task7 : {
            type: DataTypes.STRING,
        },
        task8 : {
            type: DataTypes.STRING,
        },
        task9 : {
            type: DataTypes.STRING,
        },
        task10 : {
            type: DataTypes.STRING,
        },
        familyId:{
            type: DataTypes.STRING,
        },   
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
