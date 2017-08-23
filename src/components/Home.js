import React, {Component} from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom'

import IngredientsContainer from './IngredientsContainer';
import CocktailsContainer from './CocktailsContainer';
import CocktailGlass from './CocktailGlass'
import Cocktail from './Cocktail'

// import Draggable, {DraggableCore} from 'react-draggable';
import {Button, Grid, Image, Message, Transition, Modal, Header} from 'semantic-ui-react'
// import './App.css';

const OUR_API_URL = 'http://localhost:3000/api/v1'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      ingredients: [],
      cocktailGlass: [],
      currentRecipe: [],
      currentCocktailName: 'My Cocktail',
      visible: true,
      open: false,
      secret: false
    }
  }

  componentDidMount() {
    this.fetchIngredients()
    window.addEventListener('dblclick', this.secretFunction)
  }

  componentWillUnmount() {
    window.removeEventListener('dblclick', this.secretFunction)
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

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')

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
      currentCocktailName: resp.name
    })
  }

  clearCocktailGlass = () => {
    this.setState( {
      cocktailGlass: [],
      currentRecipe: [],
      currentCocktailName: 'My Cocktail'
    })
  }

  closeModal = () => {
    this.setState({
      open: false
    })
  }

  saveCocktail = () => {
    let data = {
      name: this.state.currentCocktailName,
      is_alcoholic: true,
      image_url: 'http://blogs.kcrw.com/goodfood/wp-content/uploads/2013/12/los-angeles-magazine-cocktail-e1387501927847.jpg',

    }
    let dataToSend = JSON.stringify({
      cocktail: data,
      user: {id: 1}
    })

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')

    fetch(`${OUR_API_URL}/cocktails`,
    {method: 'POST',
    headers: myHeaders,
    body: dataToSend
  }
  ).then(resp => resp.json())
  .then((resp) => {
    console.log(resp)
    this.saveRecipes(resp.id)
  })

  }

  saveRecipes = (cocktailId) => {
    let data =
    {recipe:
      {bulk:
        []
      }
    }

    this.state.currentRecipe.forEach((recipe) => {
      data.recipe.bulk.push(
        {"cocktail_id": cocktailId,
	        "ingredient_id": recipe.ingredient.id,
          "parts": recipe.parts}
      )
    })

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')

    let dataToSend = JSON.stringify(data)

    fetch(`${OUR_API_URL}/recipes/bulkcreate`,
      {method: 'POST',
      headers: myHeaders,
      body: dataToSend
      }
    )
    .then(resp => resp.json())
    .then(resp => console.log(resp))

  }

  secretFunction = () => {
    this.closeModal()
    let audio = document.getElementById('audio')
    if(!this.state.secret){
      document.body.style.animation = 'App-logo-spin infinite 1s linear'
      document.body.style.animationPlayState = 'running'
      this.setState({
        secret: true
      }, () => audio.play())
    } else {
      document.body.style.animation = ''
      document.body.style.animationPlayState = 'paused'
      this.setState({
        secret: false
      }, () => audio.pause())
    }
  }




  render() {
    return (
      <div>
        <audio id="audio" src={"./yakety-sax.ogg"}></audio>
        <Transition animation={'drop'} duration={500} visible={this.state.open}>
          <Modal open={this.state.open} size={'mini'} onClose={this.closeModal} closeIcon={true} dimmer={'blurring'}>
            <Modal.Header><center>Your Cocktail!</center></Modal.Header>
            <Modal.Content><center>{this.state.currentCocktailName}</center></Modal.Content>
            {(this.state.cocktailGlass[0] !== undefined && this.state.cocktailGlass[0].name === 'Egg yolk') &&
              <Modal.Content><center><Button onClick={this.secretFunction}>Click to go CRAZY</Button></center></Modal.Content>
            }
          </Modal>
        </Transition>
        <div id="wrapper">
          <div id="top-nav">
            <Image className="logo" src={'./booze-chooze-logo.png'} size='medium' centered />
          </div>
          <div id="left-side-nav">
            <IngredientsContainer
              handleClick={this.toggleIngredient}
              ingredients={this.filterAlcoholicIngredients()}
              inCocktailGlass={this.inCocktailGlass}
              />
          </div>
          <div id="right-side-nav">
            <div>
              <IngredientsContainer
                handleClick={this.toggleIngredient}
                ingredients={this.filterNonAlcoholicIngredients()}
                inCocktailGlass={this.inCocktailGlass}
                />
              </div>
          </div>
          <Grid id="content-wrapper">
            <div className="assembly-line">

            <center>
              <div className="cocktail-header-name">
                <h1>{this.state.currentCocktailName}</h1>
              </div>
            </center>
          {this.state.cocktailGlass.length > 0 &&
            <Grid.Row className="cocktail-grid" centered>
            <CocktailGlass cocktailGlass={this.state.cocktailGlass} currentRecipe={this.state.currentRecipe}
            incrementParts={this.incrementParts}
            decrementParts={this.decrementParts}
            generateCocktailName={this.generateCocktailName}
            clearCocktailGlass={this.clearCocktailGlass}
            currentCocktailName={this.state.currentCocktailName}
            saveCocktail={this.saveCocktail}

            />
            </Grid.Row>
        }
        {this.state.cocktailGlass.length === 0 &&
            <Grid.Row className="cocktail-grid" centered>

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

      </div>
      </Grid>

        </div>
      </div>

    );
  }
}

export default Home;
