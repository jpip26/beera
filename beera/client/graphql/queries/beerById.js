import { gql } from '@apollo/client';

const beerByIdQuery = gql`
  query ($id: String!) {
    beer (id: $id) {
      id
      name
      description
      imageUrl
      status
      drinkByDate
    }
  }
`;

export default beerByIdQuery;
