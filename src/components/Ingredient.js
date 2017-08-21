import React from 'react';

const Ingredient = (props) => {
  return(
      <div className="ingredient" onClick={(event) => {props.handleClick(props.ingredient, event)}}>

          { <figure className="figure-thing"> <img style={{height:"50%", width:"50%"}} src={props.ingredient.image_url} alt={props.ingredient.name} /> <figcaption>{props.ingredient.name}</figcaption></figure> }

      </div>
  );
};

export default Ingredient;
