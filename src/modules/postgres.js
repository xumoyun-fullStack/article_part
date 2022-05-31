const { DB_URL } = require("../../config");
const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(DB_URL);
const UsersModel = require("../models/UsersModel");
const ArticlesModel = require("../models/ArticlesModel");
const CommentsModel = require("../models/CommentsModel");

module.exports = async function (){
    try{
        const db = {};

        db.users = await UsersModel(Sequelize, sequelize);
        db.articles = await ArticlesModel(Sequelize, sequelize);
        db.comments = await CommentsModel(Sequelize, sequelize);


        db.users.hasMany(db.comments, {
            foreignKey:{
                name: "user_id",
                allowNull: false,
            }
        });

        db.comments.belongsTo(db.users, {
            foreignKey: {
                name: "user_id",
                allowNull: false,
            }
        });

        db.articles.hasMany(db.comments, {
            foreignKey:{
                name: "article_id",
                allowNull: false,
            }
        });

        db.comments.belongsTo(db.articles, {
            foreignKey: {
                name: "article_id",
                allowNull: false,
            }
        });

        sequelize.sync({alter: false})

        return db;
    }catch(e){
        console.log("psql: " + e);
    }
}