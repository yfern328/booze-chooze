import React from 'react';
import Ingredient from './Ingredient';
import { Item } from 'semantic-ui-react';


const IngredientsContainer = (props) => {
  return(
    <Item.Group className="ingredients" divided>
      {props.ingredients.map((ingredient, index) => {
        return (

          <Ingredient
            key={index}
            ingredient={ingredient}
            handleClick={props.handleClick}
            inCocktailGlass={() => props.inCocktailGlass(ingredient)}
            onDrag={props.handleDrag}
            onStart={props.onStart}
            onStop={props.onStop}
          />

      )
      })}
    </Item.Group>
  );
};

export default IngredientsContainer;
