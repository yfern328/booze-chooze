import React from 'react';

const Ingredient = (props) => {
  return(
    <div>
    <div className="ingredient">
    <div className="ingredient-name">
      {props.ingredient.name}
    </div>
    <div className="ingredient-image">
      { <img src={props.ingredient.image_url} alt={props.ingredient.name} /> }
    </div>
  </div>
    </div>
  );
};

export default Ingredient;
