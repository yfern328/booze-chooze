import React from 'react';
import Ingredient from './Ingredient';

const IngredientsContainer = (props) => {

    return(
      <div>
        <div className="ingredients">
          {props.ingredients.map((ingredient, index) => {
            return <Ingredient key={index} ingredient={ingredient} />
          })}
        </div>
      </div>
    );
};

export default IngredientsContainer;
