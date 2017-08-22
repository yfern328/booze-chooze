import React from 'react';
import {Header, Image, Table, Button} from 'semantic-ui-react';

class CocktailGlass extends React.Component {
  constructor(props) {
    super(props)


  }
  render() {
    return (
      <div>
        <Table basic='very' celled collapsing>

          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Ingredient</Table.HeaderCell>
              <Table.HeaderCell></Table.HeaderCell>
              <Table.HeaderCell>Parts</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {this.props.cocktailGlass.map((ingredient, index) => {
              return (
                <Table.Row key={index}>
                  <Table.Cell>
                    {ingredient.name}
                  </Table.Cell>
                  <Table.Cell>
                    <Image src={ingredient.image_url} size='mini'/>
                  </Table.Cell>
                  <Table.Cell>
                    <Button.Group>
                      <Button icon="minus" size='mini' onClick={() => {this.props.decrementParts(index)}}></Button>
                      <Button>
                        {this.props.currentRecipe[index].parts}
                      </Button>
                      <Button icon="plus" size='mini' onClick={() => {this.props.incrementParts(index)}}></Button>
                    </Button.Group>
                  </Table.Cell>
                </Table.Row>
              )
            })}
          </Table.Body>
        </Table>
        <Button onClick={this.props.generateCocktailName}>
          Generate Cocktail Name
        </Button>
        <Button onClick={this.props.clearCocktailGlass}>
          Empty Glass
        </Button>
      </div>
    )
  }
}

export default CocktailGlass
