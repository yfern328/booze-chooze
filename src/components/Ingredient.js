import React from 'react';
import { Item } from 'semantic-ui-react';

const Ingredient = (props) => {
  let cocktailClass = {
    true: "item ingredient-flip",
    false: "item ingredient"
  }

  return(
    <Item className={cocktailClass[props.inCocktailGlass()]} onClick={(event) => {props.handleClick(props.ingredient, event)}}>
      <Item.Image size='tiny' src={props.ingredient.image_url} />
      <Item.Content verticalAlign='middle'><strong>{props.ingredient.name}</strong></Item.Content>
    </Item>
  );
};

export default Ingredient;
