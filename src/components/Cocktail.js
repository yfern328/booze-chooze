import React from 'react';
import {Icon, Card, Feed, Image, Button} from 'semantic-ui-react';



class Cocktail extends React.Component {

  deleteCocktail = () => {
    this.props.deleteCocktail(this.props.id)
  }

  render() {
    return (
      <Card>
        <Image src={this.props.imageUrl} />
        <Card.Content>
          <Card.Header>
            {this.props.name}
          </Card.Header>
          <Card.Meta>
            <span>
              {this.props.isAlcoholic ? 'Contains Alcohol' : 'Virgin'}
            </span>
          </Card.Meta>

        </Card.Content>
        <Card.Content>

          <Feed>
            {this.props.recipeLineItems.map((recipeLineItem, idx) => {
              return (

            <Feed.Event key={idx}>
              <Feed.Label image={this.props.imageUrls[idx]} />
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

          <Button onClick={this.deleteCocktail} color='red'>
            <Icon name='remove circle outline' size='large' />
             Delete
          </Button>

        </Card.Content>


      </Card>
    )
  }

}

export default Cocktail;

// <Button onClick={this.editCocktail}>
//   <Icon name='cocktail' size='large' />
//    Edit
// </Button>
