const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    },
    price: Sequelize.INTEGER,
    quantity: Sequelize.INTEGER,
    imgUrl: {
        type: Sequelize.STRING,
        defaultValue: "/imageurl",
    },
    description: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
        },
    }
})

module.exports = Product;
