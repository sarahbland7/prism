'use strict'
import React from 'react'
import {Router, Route, IndexRedirect, IndexRoute, browserHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'

import store from './store'
import Jokes from './components/Jokes'
import Login from './components/Login'
import WhoAmI from './components/WhoAmI'
import RandomSwatch from './components/RandomSwatch'

const ExampleApp = connect(
  ({ auth }) => ({ user: auth })
) (
  ({ user, children }) =>
    <div>
      <nav style={{ zIndex: 10000, position: 'fixed', top: '9px', right: '9px' }}>
        {user ? <WhoAmI/> : <Login/>}
      </nav> 
      {children}
    </div>
)

render (
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={ExampleApp}>
        <IndexRoute component={RandomSwatch} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)