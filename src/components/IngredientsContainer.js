import React from 'react';
import Ingredient from './Ingredient';
import { Item, Input } from 'semantic-ui-react';


class IngredientsContainer extends React.Component {

  constructor () {
    super ()
    this.state = {
      currentFilter: ''
    }
  }

  handleChange = (event) => {
    console.log(event.target.value)
    this.setState({
      currentFilter: event.target.value
    })
  }

  render() {
    return(
      <div>
      <Input icon='search' placeholder='Filter...' value={this.state.currentFilter} onChange={this.handleChange} />
        <Item.Group className="ingredients" divided>
          {this.props.ingredients.map((ingredient, index) => {
            return (

              <Ingredient
                key={index}
                ingredient={ingredient}
                handleClick={this.props.handleClick}
                inCocktailGlass={() => this.props.inCocktailGlass(ingredient)}
                onDrag={this.props.handleDrag}
                onStart={this.props.onStart}
                onStop={this.props.onStop}
              />

          )
          })}
        </Item.Group>

    </div>
    );
  };

} // end of class

export default IngredientsContainer;
