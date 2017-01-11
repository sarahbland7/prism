import React from 'react'
import chai, {expect} from 'chai'                                                   
chai.use(require('chai-enzyme')())
import {shallow} from 'enzyme'
import {spy, stub} from 'sinon'
chai.use(require('sinon-chai'))
import {createStore} from 'redux'
import {logout} from 'APP/app/reducers/auth'

import WhoAmIContainer, {WhoAmI} from './WhoAmI'

describe('<WhoAmI/>', () => {
  const user = {
    name: 'Dr. Bones',
  }
  const logout = spy() 
  let root
  beforeEach('render the root', () =>
    root = shallow(<WhoAmI user={user} logout={logout}/>)
  )

  it('greets the user', () => {
    expect(root.text()).to.contain(user.name)
  })

  it('has a logout button', () => {
    expect(root.find('button.logout')).to.have.length(1)
  })

  it('calls props.logout when logout is tapped', () => {
    root.find('button.logout').simulate('click')
    expect(logout).to.have.been.called
  })
})

describe("<WhoAmI/>'s connection", () => {
  const state = {
    auth: {name: 'Dr. Bones'}
  }
  
  let root, store, dispatch
  beforeEach('create store and render the root', () => {
    store = createStore(state => state, state)
    dispatch = stub(store, 'dispatch')
    root = shallow(<WhoAmIContainer store={store}/>)
  })

  it('gets prop.user from state.auth', () => {
    expect(root.find(WhoAmI)).to.have.prop('user').eql(state.auth)
  })

  it('dispatches logout when logout is pressed', () => {
    // Call the logout prop.
    root.find(WhoAmI).prop('logout')()
    expect(dispatch).to.have.been.calledOnce
    // Get the args of the first (and only) call
    const args = dispatch.getCall(0).args    
    // We should have been called with the logout thunk.
    expect(args).to.have.length(1)
    expect(args[0].toString()).to.equal(logout().toString())
  })
})