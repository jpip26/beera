import { gql } from '@apollo/client';

const beersQuery = gql`
  query {
    beers {
      id
      name
      description
      imageUrl
      status
      drinkByDate
    }
  }
`;

export default beersQuery;
