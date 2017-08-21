import React from 'react';
import { Item } from 'semantic-ui-react';

const Ingredient = (props) => {
  return(
    <Item className="ingredient" onClick={(event) => {props.handleClick(props.ingredient, event)}}>
      <Item.Image size='tiny' src={props.ingredient.image_url} />
      <Item.Content verticalAlign='middle'><strong>{props.ingredient.name}</strong></Item.Content>
    </Item>
  );
};

export default Ingredient;
