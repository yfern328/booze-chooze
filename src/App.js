import React, {Component} from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './components/Home';
import MyCocktails from './components/MyCocktails';
import Login from './components/Login';


// import {Button, Grid, Image, Message, Transition, Modal, Header} from 'semantic-ui-react'
import './App.css';


class App extends Component {


  render() {
    return (

<Router>
  <div>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Home} />
    <Route exact path="/mycocktails" component={MyCocktails} />
  </div>
</Router>
    )
  }



}

export default App;
