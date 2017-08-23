import React from 'react';
import {Icon, Card, Feed, Image, Button} from 'semantic-ui-react';

const alcPart = (
  <a>
    <Icon name='cocktail' />
    16 Friends
  </a>
)

const Cocktail = (props) => (
  <Card>
    <Image src={props.imageUrl} />
    <Card.Content>
      <Card.Header>
        {props.name}
      </Card.Header>
      <Card.Meta>
        <span>
          {props.isAlcoholic ? 'Contains Alcohol' : 'Virgin'}
        </span>
      </Card.Meta>

    </Card.Content>
    <Card.Content>

      <Feed>
        {props.recipeLineItems.map((recipeLineItem) => {
          return (

        <Feed.Event>
          <Feed.Label image={"http://www.thecocktaildb.com/images/ingredients/Iced tea.png"} />
          <Feed.Content>
            <Feed.Label>
              {recipeLineItem}
            </Feed.Label>
          </Feed.Content>
        </Feed.Event>
      )

      })}

      </Feed>

    </Card.Content>
    <Card.Content extra>
      <Button onClick={props.editCocktail}>
        <Icon name='cocktail' size='large' />
         Edit
      </Button>
      <Button onClick={props.deleteCocktail}>
        <Icon name='remove circle outline' size='large' />
         Delete
      </Button>

    </Card.Content>


  </Card>
)

export default Cocktail;
