import { gql } from '@apollo/client';

const createBeerMutation = gql`
  mutation ($name: String!, $drinkByDate: String) {
    createBeer (name: $name, drinkByDate: $drinkByDate) {
      id
      name
      description
      imageUrl
      status
      drinkByDate
    }
  }
`;

export default createBeerMutation;
