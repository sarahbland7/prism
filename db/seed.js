const _ = require('lodash')
const db = require('APP/db')

const seedUsers = () => db.Promise.map([
  {name: 'so many', email: 'god@example.com', password: '1234'},
  {name: 'Barack Obama', email: 'barack@example.gov', password: '1234'},
], user => db.model('users').create(user))

const seedColors = () => db.Promise.map(
  _.uniqBy(require('blee').all.all(), color => color.name),

  ({ name, color: {r, g, b} }) => db.model('colors').create({
    name, r, g, b
  })
)

db.didSync
  .then(() => db.sync({force: true}))
  .then(seedUsers)
  .then(users => console.log(`Seeded ${users.length} users OK`))  
  .then(seedColors)
  .then(colors => console.log(`Seeded ${colors.length} colors OK`))
  .catch(error => console.error(error))    
  .finally(() => db.close())
