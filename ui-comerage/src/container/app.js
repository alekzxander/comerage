import React, { Component } from 'react'
import Header from '../component/header';
// import Login from '../component/login';
import Articles from './articles';


export default class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="form-login">
          {/* <Login /> */}
        </div>
        <div className="container">
          <Articles />
        </div>

      </div>
    )
  }
}
