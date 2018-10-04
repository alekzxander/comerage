const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');

const articleModel = sequelizeDb.define('articles', {
    body: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    publication_date: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    draft: {
        type: Sequelize.BOOLEAN,
        allowNull: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

module.exports = articleModel;