import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import '../GlobalFiles/Global.sass'
import Home from '../Pages/Home'
import './Global.sass'

export const ReactRouter: React.FC = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </BrowserRouter>
)
