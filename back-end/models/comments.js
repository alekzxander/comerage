const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');

const commentModel = sequelizeDb.define('comments', {
    body: {
        type: Sequelize.STRING,
        allowNull: false
    },
    publication_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    article_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

module.exports = commentModel;