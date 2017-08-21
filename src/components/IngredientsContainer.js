import React from 'react';
import Ingredient from './Ingredient';
import { Item } from 'semantic-ui-react';

const IngredientsContainer = (props) => {
  return(
    <Item.Group className="ingredients">
      {props.ingredients.map((ingredient, index) => {
        return <Ingredient key={index} ingredient={ingredient} handleClick={props.handleClick} />
      })}
    </Item.Group>
  );
};

export default IngredientsContainer;
