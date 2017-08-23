import React, { Component } from 'react';
import {Card} from 'semantic-ui-react';
import Cocktail from './Cocktail';

class CocktailsContainer extends Component {
  // constructor(){
  //   super()
  //
  //   this.state = {
  //
  //   }
  // }

  render() {
    return(
      <div>
        <Card.Group itemsPerRow={4}>
          {this.props.cocktails.map((cocktail) => {
            return (
              <Cocktail
                name={cocktail.cocktail.name}
                isAlcoholic={cocktail.cocktail.is_alcoholic}
                imageUrl={cocktail.cocktail.image_url}
                recipeLineItems={cocktail.recipe_line_item_texts}/>
            )

          })}
      </Card.Group>
      </div>
    );
  }
};

export default CocktailsContainer;
