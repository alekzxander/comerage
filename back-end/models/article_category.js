const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');

const categoryArticleModel = sequelizeDb.define('categories_has_articles', {
    categories_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    articles_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = categoryArticleModel;