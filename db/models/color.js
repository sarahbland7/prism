'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')

module.exports = db.define('colors', {
  name: Sequelize.STRING,
  r: Sequelize.INTEGER,
  g: Sequelize.INTEGER,
  b: Sequelize.INTEGER,
}, {indexes: [{fields: ['name'], unique: true,}],})
