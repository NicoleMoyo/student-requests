module.exports = (sequelize, DataTypes) => {

    const Staff = sequelize.define("Staff", {
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
        role: {
            type: DataTypes.ENUM('Facilitator', 'Team Lead'),
            allowNull: false,
        },
    })

    return Staff
}