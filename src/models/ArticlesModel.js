module.exports = async function ArticlesModel(Sequelize, sequelize){
    return sequelize.define("articles", {
        id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4(),
            primaryKey: true,
        },
        title: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        },
        text: {
            type: Sequelize.DataTypes.TEXT,
            allowNull: false,
        },
        author: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
        }
    })
}