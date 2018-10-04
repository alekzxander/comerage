import React, { Component } from 'react'
import Header from '../component/header';
import Articles from './articles';
import SelectArticle from './selectArticle';
import { Route, Switch } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">
          <Switch>
            <Route path="/article" component={SelectArticle} />
            <Route path="/" component={Articles} />
          </Switch>
        </div>

      </div>
    )
  }
}
