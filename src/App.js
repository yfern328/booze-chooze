import React, {Component} from 'react';
import IngredientsContainer from './components/IngredientsContainer';
import CocktailsContainer from './components/CocktailsContainer';
import CocktailGlass from './components/CocktailGlass'
import {Button, Grid, Image, Message} from 'semantic-ui-react'
import Draggable, {DraggableCore} from 'react-draggable';
import './App.css';

const OUR_API_URL = 'http://localhost:3000/api/v1'

class App extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      cocktailGlass: [],
      currentRecipe: [],
      currentCocktailName: '',
      activeDrags: 0,
      deltaPosition: {
        x: 0, y: 0
      },
    }
  }

  incrementParts = (idx) => {
    const recipe = this.state.currentRecipe
    recipe[idx].parts++

    this.forceUpdate();

  }

  decrementParts = (idx) => {
    const recipe = this.state.currentRecipe
    recipe[idx].parts--
    if(recipe[idx].parts === 0) {
      this.toggleIngredient(recipe[idx].ingredient)
    } else {
      this.forceUpdate();
    }
  }

  fetchIngredients = () => {
    return fetch(`${OUR_API_URL}/ingredients`).then(res => res.json()).then(data => this.setState({
      ingredients: data
    } ))
  }

  componentDidMount() {
    this.fetchIngredients()
  }

  filterAlcoholicIngredients = () => {
    return this.state.ingredients.filter(ingredient => ingredient.is_alcoholic === true)
  }

  filterNonAlcoholicIngredients = () => {
    return this.state.ingredients.filter(ingredient => ingredient.is_alcoholic === false)
  }

  inCocktailGlass = (ingredient) => {
    return this.state.cocktailGlass.includes(ingredient)
  }

  toggleIngredient = (ingredient) => {
    // console.log(ingredient)
    // console.log(this.state.cocktailGlass)
    if (this.state.cocktailGlass.includes(ingredient)) {
      let currentGlass = this.state.cocktailGlass
      let currentRecipe = this.state.currentRecipe
      let ingIdx = currentGlass.indexOf(ingredient)
      currentGlass.splice(ingIdx, 1)
      currentRecipe.splice(ingIdx, 1)

      this.setState({
        cocktailGlass: currentGlass,
        currentRecipe: currentRecipe
      }, () => console.log('Removed ingredient ', ingredient.name))
    }
    else {
      this.setState({
        cocktailGlass: [...this.state.cocktailGlass, ingredient],
        currentRecipe: [...this.state.currentRecipe, {ingredient: ingredient, parts: 1}]
      }, () => console.log('Added ingredient ', ingredient.name))
    }
  }

  generateCocktailName = () => {
    let data = {}
    this.state.currentRecipe.forEach((item) => {
      let name = item.ingredient.name
      data[name] = item.parts
    })
    let dataToSend = JSON.stringify({recipe: data});
    console.log(data)

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')
    console.log(myHeaders.get('Content-Type'))

    fetch(`${OUR_API_URL}/cocktails/generate`,
    {method: 'POST',
    headers: myHeaders,
    body: dataToSend
  }
  ).then(resp => resp.json())
  .then(resp => this.updateCocktailName(resp))

  }

  updateCocktailName = (resp) => {
    console.log(resp)
  }

  clearCocktailGlass = () => {
    this.setState( {
      cocktailGlass: [],
      currentRecipe: []
    })
  }


// DRAGGABLE STUFF

  handleDrag = (e, ui) => {
    const {x, y} = this.state.deltaPosition;
    this.setState({
      deltaPosition: {
        x: x + ui.deltaX,
        y: y + ui.deltaY,
      }
    });
  }

  onStart = () => {
    console.log('drag started')
    this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop = () =>  {
    console.log('drag stopped')
    this.setState({activeDrags: --this.state.activeDrags});
  }



  render() {
    return (
      <div>
        {/* <CocktailsContainer /> */}
        <div id="wrapper">
          <div id="top-nav">
            <Image src={'./booze-chooze-logo.png'} size='medium' centered />
          </div>
          <div id="left-side-nav">
            <IngredientsContainer
              handleClick={this.toggleIngredient}
              ingredients={this.filterAlcoholicIngredients()}
              inCocktailGlass={this.inCocktailGlass}
              />
          </div>
          <div id="right-side-nav">
            <IngredientsContainer
              handleClick={this.toggleIngredient}
              ingredients={this.filterNonAlcoholicIngredients()}
              inCocktailGlass={this.inCocktailGlass}
              onDrag={this.handleDrag}
              onStart={this.onStart}
              onStop={this.onStop}
              />
          </div>
          {this.state.cocktailGlass.length > 0 &&
          <Grid id="content-wrapper" centered columns={1}>
            <CocktailGlass cocktailGlass={this.state.cocktailGlass} currentRecipe={this.state.currentRecipe}
            incrementParts={this.incrementParts}
            decrementParts={this.decrementParts}
            generateCocktailName={this.generateCocktailName}
            clearCocktailGlass={this.clearCocktailGlass}

            />
          </Grid>
        }
        {this.state.cocktailGlass.length === 0 &&
          <Grid id="content-wrapper" centered columns={1}>
            <Grid.Row centered>

            <Message>
              <Message.Header>Get your drink on</Message.Header>
              <Message.List>
                <Message.Item>Click an ingredient to get started!</Message.Item>
                <Message.Item>Alcohol is on the left.</Message.Item>
              </Message.List>
            </Message>
          </Grid.Row>
          </Grid>
        }
        </div>
      </div>

    );
  }
}

export default App;
