module.exports = (sequelize, DataTypes) => {

    const Requests = sequelize.define("Requests", {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        creator_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        request_type: {
            type: DataTypes.ENUM('Academic', 'Admin'),
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        assigned_id: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    })

    return Requests
}