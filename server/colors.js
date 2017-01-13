'use strict'

const Sequelize = require('sequelize')
const db = require('APP/db')
const Color = db.model('colors')

module.exports = require('express').Router()
	.get('/', (req, res, next) => 
		Color.find({ order: Sequelize.fn('RANDOM') })
			.then(color => res.redirect(`/api/colors/${color.name}`))
			.catch(next))
	.get('/:name', (req, res, next) => 
    	Color.find({ where: {name: req.params.name} })
		  	.then(color => res.json(color))
			  .catch(next))