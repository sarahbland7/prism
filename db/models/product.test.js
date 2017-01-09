'use strict'

const db = require('APP/db')
const Product = require('./product')
const {expect} = require('chai')

describe('Product', () => {
  before('wait for the db', () => db.didSync)

  const aqua = {
      title: 'Aquamarine',
      description: 'A soothing sea green',
      price: 22.95,
      qty: 100
  }
  it('has title, description, price, and inventory qty', () =>
    Product
      .create(aqua)
      .then(product =>
        expect(product).to.deep.equal(aqua)))
})