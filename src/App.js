import React, { Component } from 'react';
import IngredientsContainer from './components/IngredientsContainer';
/* import CocktailsContainer from './components/CocktailsContainer' */
import './App.css';

class App extends Component {

  render() {
    return (
        <div>
          {/* <CocktailsContainer /> */}
          <div id="wrapper">
            <div id="top-nav">
              BoozeChooze
            </div>
            <div id="left-side-nav">
              <IngredientsContainer />
            </div>
            <div id="right-side-nav">
              <IngredientsContainer />
            </div>
            <div id="content-wrapper">
              Center
            </div>
          </div>
        </div>

    );
  }
}

export default App;
