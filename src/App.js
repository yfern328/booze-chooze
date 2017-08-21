import React, { Component } from 'react';
import IngredientsContainer from './components/IngredientsContainer';
/* import CocktailsContainer from './components/CocktailsContainer' */
import { Button } from 'semantic-ui-react'
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

changeBackground = (arg, event) => {
  console.log(arg)
  if(event.target.tagName === 'IMG' ){
    console.log(event.target.alt)
    if(event.target.parentElement.parentElement.className === 'ingredient') {
      event.target.parentElement.parentElement.className = 'ingredient-flip'
    }
    else {
      event.target.parentElement.parentElement.className = 'ingredient'
    }
  }
  else if(event.target.tagName === 'FIGCAPTION'){
    console.log(event.target.innerText)
    if(event.target.parentElement.parentElement.className === 'ingredient') {
      event.target.parentElement.parentElement.className = 'ingredient-flip'
    }
    else {
      event.target.parentElement.parentElement.className = 'ingredient'
    }
  }
  else if(event.target.tagName === 'FIGURE'){
    console.log(event.target.lastChild.innerText)
    if(event.target.parentElement.className === 'ingredient') {
      event.target.parentElement.className = 'ingredient-flip'
    }
    else {
      event.target.parentElement.className = 'ingredient'
    }
  }
}

  render() {
    return (
        <div>
          {/* <CocktailsContainer /> */}
          <div id="wrapper">
            <div id="top-nav">
              BoozeChooze
              <Button>
                get fucked nerd
              </Button>
            </div>
            <div id="left-side-nav">
              <IngredientsContainer handleClick={this.changeBackground} ingredients={this.filterAlcoholicIngredients()}/>
            </div>
            <div id="right-side-nav">
              <IngredientsContainer handleClick={this.changeBackground} ingredients={this.filterNonAlcoholicIngredients()}/>
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
