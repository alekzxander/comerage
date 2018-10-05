const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');

const categoryArticleModel = sequelizeDb.define('categories_has_articles', {
    category_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
    },
    article_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }
});

module.exports = categoryArticleModel;