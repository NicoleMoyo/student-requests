module.exports = (sequelize, DataTypes) => {

    const Responses = sequelize.define("Responses", {
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
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        request_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false
        }
    })

    return Responses
}