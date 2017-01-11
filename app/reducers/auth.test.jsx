import {expect} from 'chai'
import auth from './auth'

describe('the auth reducer', () => {
  it('starts with a null state', () => {
    const next = auth(undefined, {type: '@@INIT'})
    expect(next).to.equal(null)
  })

  it('on AUTHENTICATED(user: any), its state becomes user', () => {
    const next = auth(null, {type: 'AUTHENTICATED', user: 'Mr. Bones'})
    expect(next).to.equal('Mr. Bones')
  })

  describe('when already authenticated', () => {
    const state = {user: 'Mr. Bones'}

    it('on AUTHENTICATED(user: any), its state becomes the new user', () => {
      const next = auth(state, {
        type: 'AUTHENTICATED',
        user: {name: 'Mrs. Ash'}
      })
      expect(next).to.deep.equal({name: 'Mrs. Ash'})
    })
  })
})