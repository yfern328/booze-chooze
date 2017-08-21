import React, { Component } from 'react';
import Ingredient from './Ingredient';

class IngredientsContainer extends Component {
  constructor(){
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
    return(
      <div>
        <div className="non-alcoholic-ingredients">
          {this.filterNonAlcoholicIngredients().map((ingredient, index) => {
            return <Ingredient key={index} ingredient={ingredient} />
          })}
        </div>
        <div className="alcoholic-ingredients">
          {this.filterAlcoholicIngredients().map((ingredient, index) => {
            return <Ingredient key={index} ingredient={ingredient} />
          })}
        </div>
      </div>
    );
  }
};

export default IngredientsContainer;
