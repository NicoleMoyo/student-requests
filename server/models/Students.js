module.exports = (sequelize, DataTypes) => {

    const Students = sequelize.define("Students", {
        username: {
            type: DataTypes.STRING(100),
            allowNull: false,
            primaryKey: true,
        },
        first_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        last_name: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    })

    return Students
}