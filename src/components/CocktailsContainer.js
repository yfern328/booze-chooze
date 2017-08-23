import React, { Component } from 'react';
import {Card} from 'semantic-ui-react';
import Cocktail from './Cocktail';


class CocktailsContainer extends Component {

  // constructor(props){
  //   super(props)
  //
  // }



  render() {
    return(
      <div>
        <Card.Group itemsPerRow={3}>
          {this.props.cocktails.map((cocktail) => {
            return (
              <Cocktail
                name={cocktail.cocktail.name}
                isAlcoholic={cocktail.cocktail.is_alcoholic}
                imageUrl={cocktail.cocktail.image_url}
                recipeLineItems={cocktail.recipe_line_item_texts}
                imageUrls={cocktail.ingredient_image_urls}
                deleteCocktail={this.props.deleteCocktail}
                id={cocktail.cocktail.id}
                key={cocktail.cocktail.id}
              />
            )

          })}
      </Card.Group>
      </div>
    );
  }
};

export default CocktailsContainer;
