const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');

const categoryModel = sequelizeDb.define('categories', {
    name: {
        type: Sequelize.STRING,
    }
});

module.exports = categoryModel;