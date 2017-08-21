import React, {Component} from 'react';
import IngredientsContainer from './components/IngredientsContainer';
import CocktailsContainer from './components/CocktailsContainer';
import CocktailGlass from './components/CocktailGlass'
import {Button, Grid} from 'semantic-ui-react'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      cocktailGlass: [],
      currentRecipe: []
    }
  }

  fetchIngredients = () => {
    return fetch(`http://localhost:3000/api/v1/ingredients`).then(res => res.json()).then(data => this.setState({
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

  toggleIngredient = (ingredient) => {
    // console.log(ingredient)
    // console.log(this.state.cocktailGlass)
    if (this.state.cocktailGlass.includes(ingredient)) {
      let currentGlass = this.state.cocktailGlass
      let currentRecipe = this.state.currentRecipe
      let ingIdx = currentGlass.indexOf(ingredient)
      currentGlass.splice(ingIdx, 1)
      currentRecipe.splice(ingIdx, 1)

      this.setState({
        cocktailGlass: currentGlass,
        currentRecipe: currentRecipe
      }, () => console.log(this.state.cocktailGlass, this.state.currentRecipe))
    }
    else {
      this.setState({
        cocktailGlass: [...this.state.cocktailGlass, ingredient],
        currentRecipe: [...this.state.currentRecipe, {ingredient: ingredient, parts: 1}]
      }, () => console.log(this.state.cocktailGlass, this.state.currentRecipe))
    }
  }

  changeBackground = (arg, event) => {
    this.toggleIngredient(arg)
    // console.log(event.target.tagName)
    // console.log(event.target.parentElement.parentElement.className)

    var newClassName = {
      "item ingredient": "item ingredient-flip",
      "item ingredient-flip": "item ingredient",
      "middle aligned content": "middle aligned content"
    }
    var grandParentClass = event.target.parentElement.parentElement.className
    var currentClass = event.target.className

    if (event.target.tagName === 'IMG') {
      event.target.parentElement.parentElement.className = newClassName[grandParentClass]
    } else if (event.target.tagName === 'STRONG') {
      event.target.parentElement.parentElement.className = newClassName[grandParentClass]
    } else if (event.target.tagName === 'DIV') {
      event.target.className = newClassName[currentClass]
      if (event.target.className === 'middle aligned content') {
        event.target.parentElement.className = newClassName[event.target.parentElement.className]
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
          </div>
          <div id="left-side-nav">
            <IngredientsContainer handleClick={this.changeBackground} ingredients={this.filterAlcoholicIngredients()}/>
          </div>
          <div id="right-side-nav">
            <IngredientsContainer handleClick={this.changeBackground} ingredients={this.filterNonAlcoholicIngredients()}/>
          </div>
          <Grid id="content-wrapper" centered columns={1}>
            <CocktailGlass cocktailGlass={this.state.cocktailGlass}/>
          </Grid>
        </div>
      </div>

    );
  }
}

export default App;
