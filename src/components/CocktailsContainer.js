import React, { Component } from 'react';
import Cocktail from './Cocktail';

class CocktailsContainer extends Component {
  constructor(){
    super()

    this.state = {
      cocktails: []
    }
  }

  render() {
    return(
      <div>
        { <Cocktail /> }
      </div>
    );
  }
};

export default CocktailsContainer;
