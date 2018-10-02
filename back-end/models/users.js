const sequelizeDb = require('../database/db');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt-nodejs');

const userModel = sequelizeDb.define('users', {
    email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
    },
    nickname: {
        type: Sequelize.STRING(60),
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
}
);
userModel.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

module.exports = userModel;
