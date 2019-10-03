'use strict'

import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, withRouter } from 'react-router-dom'
import { Switch, Route } from 'react-router'
import '@babel/polyfill'

import './media/styles/main.scss'

import MainContainer from './modules/Main/MainContainer'
import Login from './modules/Login/Login'
import NotFound from './modules/Others/NotFound'

document.title = process.env.TITLE

ReactDOM.render(
  <HashRouter>
    <Switch>
      <Route exact path='/' component={Login} />
      <Route path='/main' component={withRouter(MainContainer)} />
      <Route path='*' component={NotFound} />
    </Switch>
  </HashRouter>,
  document.getElementById('root'),
)
