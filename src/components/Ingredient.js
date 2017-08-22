import React from 'react';
import { Item } from 'semantic-ui-react';
// import Draggable from 'react-draggable';

const Ingredient = (props) => {
  let cocktailClass = {
    true: "item ingredient-flip",
    false: "item ingredient"
  }

  return(

      <Item className={cocktailClass[props.inCocktailGlass()]} onClick={(event) => {props.handleClick(props.ingredient)}}>
        <Item.Image size='tiny' src={props.ingredient.image_url} />
        <Item.Content verticalAlign='middle'><strong>{props.ingredient.name}</strong></Item.Content>
      </Item>

  );
};

export default Ingredient;
