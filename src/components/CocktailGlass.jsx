import React from 'react';
import Ingredient from './Ingredient'
import { Header, Image, Table, Button } from 'semantic-ui-react';

const CocktailGlass = props => {
  console.log(props.cocktailGlass)
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
        {props.cocktailGlass.map((ingredient, index) => {
          return (<Table.Row key={index}>
            <Table.Cell>
              {ingredient.name}
            </Table.Cell>
            <Table.Cell>
              <Image src={ingredient.image_url} size='mini' />
            </Table.Cell>
            <Table.Cell>
            <Button.Group>
            <Button   icon="minus" size='mini'>
            </Button>
            <Button>
              1
            </Button>
            <Button icon="plus" size='mini'>
            </Button>
            </Button.Group>
            </Table.Cell>
          </Table.Row>)
        })}
      </Table.Body>
  </Table>
  <Button>
    Generate Cocktail
  </Button>
  </div>
  )
}

export default CocktailGlass
