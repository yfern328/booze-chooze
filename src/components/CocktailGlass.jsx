import React from 'react';
import Ingredient from './Ingredient'
import {Table, Grid} from 'semantic-ui-react';

const CocktailGlass = props => {
  console.log(props.cocktailGlass)
  return (
    <Grid.Column>
      <Table basic='very' celled collapsing>
        <Table.Body>
          <Table.Row>
            <Table.Cell>
              {props.cocktailGlass.map((ingredient, index) => {
                <div> <h1>did someone say meeeeeeeeeeeeemes</h1> </div>
              })}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid.Column>
  )
}

export default CocktailGlass
