import React, {Component} from 'react';
import IngredientsContainer from './components/IngredientsContainer';
import CocktailsContainer from './components/CocktailsContainer';
import CocktailGlass from './components/CocktailGlass'
import {Button, Grid, Image, Message, Transition, Modal} from 'semantic-ui-react'
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
      visible: true,
      open: false
    }
  }

  incrementParts = (idx) => {
    const recipe = this.state.currentRecipe
    recipe[idx].parts++

    this.setState({
      currentRecipe: this.state.currentRecipe,
      visible: !this.state.visible
    })

  }

  decrementParts = (idx) => {
    const recipe = this.state.currentRecipe
    recipe[idx].parts--
    if(recipe[idx].parts === 0) {
      this.toggleIngredient(recipe[idx].ingredient)
    } else {
      this.setState({
        currentRecipe: this.state.currentRecipe,
        visible: !this.state.visible
      })
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
    console.log(this.state.visible)
    if (this.state.cocktailGlass.includes(ingredient)) {
      let currentGlass = this.state.cocktailGlass
      let currentRecipe = this.state.currentRecipe
      let ingIdx = currentGlass.indexOf(ingredient)
      currentGlass.splice(ingIdx, 1)
      currentRecipe.splice(ingIdx, 1)

      this.setState({
        cocktailGlass: currentGlass,
        currentRecipe: currentRecipe,
        visible: !this.state.visible
      }, () => console.log('Removed ingredient ', ingredient.name))
    }
    else {
      this.setState({
        cocktailGlass: [...this.state.cocktailGlass, ingredient],
        currentRecipe: [...this.state.currentRecipe, {ingredient: ingredient, parts: 1}],
        visible: !this.state.visible
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
    this.setState({
      open: true,
      currentCocktailName: resp
    })
  }

  clearCocktailGlass = () => {
    this.setState( {
      cocktailGlass: [],
      currentRecipe: []
    })
  }

  closeModal = () => {
    this.setState({
      open: false
    })
  }



  changeBackground = (arg, event) => {
    this.toggleIngredient(arg)
    // console.log(event.target.tagName)
    // console.log(event.target.parentElement.parentElement.className)

    // var newClassName = {
    //   "item ingredient": "item ingredient-flip",
    //   "item ingredient-flip": "item ingredient",
    //   "middle aligned content": "middle aligned content"
    // }
    //
    // var grandParentClass = event.target.parentElement.parentElement.className
    // var currentClass = event.target.className
    //
    // if (event.target.tagName === 'IMG') {
    //   event.target.parentElement.parentElement.className = newClassName[grandParentClass]
    // } else if (event.target.tagName === 'STRONG') {
    //   event.target.parentElement.parentElement.className = newClassName[grandParentClass]
    // } else if (event.target.tagName === 'DIV') {
    //   event.target.className = newClassName[currentClass]
    //   if (event.target.className === 'middle aligned content') {
    //     event.target.parentElement.className = newClassName[event.target.parentElement.className]
    //   }
    // }

  }

  render() {
    return (
      <div>
        {/* <CocktailsContainer /> */}
        <Transition animation={'drop'} duration={500} visible={this.state.open}>
          <Modal open={this.state.open} size={'mini'} onClose={this.closeModal} closeIcon={true} dimmer={'blurring'}>
            <Modal.Header><center>Your Cocktail!</center></Modal.Header>
            <Modal.Content><center>{this.state.currentCocktailName.name}</center></Modal.Content>
          </Modal>
        </Transition>
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
              />
          </div>
          <Grid id="content-wrapper" centered columns={1}>
          {this.state.cocktailGlass.length > 0 &&
            <CocktailGlass cocktailGlass={this.state.cocktailGlass} currentRecipe={this.state.currentRecipe}
            incrementParts={this.incrementParts}
            decrementParts={this.decrementParts}
            generateCocktailName={this.generateCocktailName}
            clearCocktailGlass={this.clearCocktailGlass}

            />
        }
        {this.state.cocktailGlass.length === 0 &&
            <Grid.Row centered>
              <Message>
                <Message.Header>Get your drink on</Message.Header>
                <Message.List>
                  <Message.Item>Click an ingredient to get started!</Message.Item>
                  <Message.Item>Alcohol is on the left.</Message.Item>
                </Message.List>
              </Message>
            </Grid.Row>
        }
        <Transition animation={'jiggle'} duration={350} visible={this.state.visible}>
          <Image centered width={'150px'} height={'150px'} src='./shaker.jpg'/>
        </Transition>
        </Grid>


        </div>
      </div>

    );
  }
}

export default App;
