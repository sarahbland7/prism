const firebase = require('firebase')
require('firebase/firestore')
require('./setup')(firebase)

const db = firebase.firestore()

const seed = require ('../data/colors')
const {rgb2hex} = require('color-functions')

const colors = require('~/data/colors')

// TODO: Seed the database with colors
