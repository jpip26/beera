import { gql } from '@apollo/client';

const editBeerMutation = gql`
  mutation ($beer: BeerInput!) {
    editBeer (beer: $beer) {
      id
      name
      description
      imageUrl
      status
      drinkByDate
    }
  }
`;

export default editBeerMutation;
