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
    return fetch(`http://192.168.4.38:3000/api/v1/ingredients`)
      .then(res => res.json())
      .then(data => this.setState({
        ingredients: data
      }, () => console.log(data)))
  }

  componentDidMount() {
    this.fetchIngredients()
  }

  render() {
    return(
      <div>
      {this.state.ingredients.map((ingredient, index) => {
        return <Ingredient key={index} ingredient={ingredient} />
      })}
      </div>
    );
  }
};

export default IngredientsContainer;
