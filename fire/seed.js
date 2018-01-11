const firebase = require('firebase')
require('firebase/firestore')
require('./setup')(firebase)

const db = firebase.firestore()

//const colors = require('~/data/colors')
const colors = require('../data/colors')

/*
const seed = require ('../data/colors')
const {rgb2hex} = require('color-functions')
*/

/*
let i = seed.length; while(--i >= 0) {
  const {name, color: {r, g, b}} = seed[i]
  const id = rgb2hex(r, g, b)

  colors.doc(id).set({
    red: r,
    green: g,
    blue: b,
    ['names.' + name]: true,
  }, {merge: true})
  .then(() =>
      console.log('wrote ${id} as ${name}')
    )
}
*/

// TODO: Seed the database with colors
