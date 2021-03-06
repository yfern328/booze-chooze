import React, {Component} from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

// import IngredientsContainer from './IngredientsContainer';
import CocktailsContainer from './CocktailsContainer';
// import CocktailGlass from './CocktailGlass'
// import Cocktail from './Cocktail'

// import Draggable, {DraggableCore} from 'react-draggable';
import {Grid, Image} from 'semantic-ui-react'
// import './App.css';

const OUR_API_URL = 'http://localhost:3000/api/v1'

class MyCocktails extends Component {
  constructor() {
    super()
    this.state = {
      currentCocktailName: 'My Cocktailsss',
      visible: true,
      open: false,
      userId: 1,
      cocktails: []
    }
  }

  componentDidMount () {
    this.fetchCocktails()
  }

  fetchCocktails = () => {
    return fetch(`${OUR_API_URL}/users/${this.state.userId}/cocktails`).then(res => res.json()).then(data => this.populateCocktails(data))
  }

  populateCocktails = (data) => {
    let cocktailPromises = data.map((cocktail) => {
      return fetch(`${OUR_API_URL}/cocktails/${cocktail.id}`)
      .then(resp => resp.json())

    })
    Promise.all(cocktailPromises)
    .then((resp) => this.setState({
      cocktails: resp
    }))
  }


  closeModal = () => {
    this.setState({
      open: false
    })
  }



  deleteCocktail = (id) => {
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Accept', 'application/json')

    this.removeCocktailFromContainer(id)

    fetch(`${OUR_API_URL}/cocktails/${id}`,
      {method: 'DELETE',
      headers: myHeaders
    })
    .then(resp => resp.json())
    .then(resp => console.log(resp))


  }

  removeCocktailFromContainer = (id) => {
    console.log('id: ', id)
    let currentCocktails = this.state.cocktails
    console.log(currentCocktails)
    let cocktailToDelete = currentCocktails.find((ck) => ck.cocktail.id === id)
    console.log(cocktailToDelete)
    let idx = currentCocktails.indexOf(cocktailToDelete)
    console.log('idx: ', idx)
    currentCocktails.splice(idx, 1)
    this.setState({
      cocktails: currentCocktails
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






  render() {
    return (
      <div>
        {/* <CocktailsContainer /> */}

        <div id="wrapper">
          <div id="top-nav">
            <Image className="cocktail-nav-button" src={'./paw-print.png'} size='mini' href={'/'} />
            <Image className="cocktail-logo" src={'./my-cocktails.png'} size='medium' centered />
          </div>

          <Grid id="my-cocktails-wrapper">
            <div className="assembly-line">
              <Grid.Column>

              <Grid.Row >

                <CocktailsContainer
                  userId={1}
                  cocktails={this.state.cocktails}
                  deleteCocktail={this.deleteCocktail}
                />

              </Grid.Row>

            </Grid.Column>
            </div>
          </Grid>

        </div>
      </div>

    );
  }
} //end of class

export default MyCocktails;

// <Cocktail
//   imageUrl={'http://blogs.kcrw.com/goodfood/wp-content/uploads/2013/12/los-angeles-magazine-cocktail-e1387501927847.jpg'}
//   name={'test cocktail'}
//   isAlcoholic={true}
//   recipeLineItems={[
//                       "3 parts coconut milk",
//                       "1 part Watermelon schnapps",
//                       "1 part Vermouth"
//
//                   ]}
//
// />
