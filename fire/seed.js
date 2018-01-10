const firebase = require('firebase')
require('firebase/firestore')
require('./setup')(firebase)

const db = firebase.firestore()

const colors = require('~/data/colors')

// TODO: Seed the database with colors