import React from 'react';
import {Header, Image, Table, Button, Message} from 'semantic-ui-react';

class CocktailGlass extends React.Component {
  constructor(props) {
    super(props)


  }


  render() {
    return (
      <div>
        <div className="cocktail-card">
        <Message>
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
        </Message>
        </div>

      </div>
    )
  }
}

export default CocktailGlass
