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
    this.setState({
      currentFilter: event.target.value
    })
  }

  clearFilter = () => {
    this.setState({
      currentFilter: ''
    })
  }

  render() {

    let iconCls = {
      false: 'remove circle',
      true: 'search'
    }

    return(
      <div>
      <div className="booze-filter">
        <Input
          placeholder='Filter ingredients'

          value={this.state.currentFilter}
          onChange={this.handleChange}
          icon={{name: iconCls[(this.state.currentFilter.length === 0)], link:true, onClick: this.clearFilter}}
          />
      </div>

      <Item.Group className="ingredients" divided>

          {this.props.ingredients.map((ingredient, index) => {


              if(ingredient.name.toLowerCase().includes(this.state.currentFilter.toLowerCase())) {
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
            }



          })}
        </Item.Group>

    </div>
    );
  };

} // end of class

export default IngredientsContainer;
