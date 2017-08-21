import React, { Component } from 'react';
import IngredientsContainer from './components/IngredientsContainer';
/* import CocktailsContainer from './components/CocktailsContainer' */
import './App.css';

class App extends Component {
  constructor() {
  super()
  this.state = {
    ingredients: []
  }
}

fetchIngredients = () => {
  return fetch(`http://localhost:3000/api/v1/ingredients`)
    .then(res => res.json())
    .then(data => this.setState({
      ingredients: data
    }, () => console.log(data)))
}

componentDidMount() {
  this.fetchIngredients()
}

filterAlcoholicIngredients = () => {
  return this.state.ingredients.filter(ingredient => ingredient.is_alcoholic === true)
}

filterNonAlcoholicIngredients = () => {
  return this.state.ingredients.filter(ingredient => ingredient.is_alcoholic === false)
}

  render() {
    return (
        <div>
          {/* <CocktailsContainer /> */}
          <div id="wrapper">
            <div id="top-nav">
              BoozeChooze
            </div>
            <div id="left-side-nav">
              <IngredientsContainer ingredients={this.filterAlcoholicIngredients()}/>
            </div>
            <div id="right-side-nav">
              <IngredientsContainer ingredients={this.filterNonAlcoholicIngredients()}/>
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
