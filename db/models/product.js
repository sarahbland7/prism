'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

const Product = db.define('product', {
  name: Sequelize.STRING,  
  description: Sequelize.TEXT,
  price: Sequelize.DECIMAL(10, 2),
  inventory: Sequelize.INTEGER,
})

module.exports = Product