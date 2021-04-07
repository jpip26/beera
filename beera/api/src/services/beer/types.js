export default `
  type Beer {
    id: String!
    name: String!
    description: String!
    imageUrl: String
    status: String!
    drinkByDate: String
  }

  input BeerInput {
    id: String!
    name: String!
    description: String
    imageUrl: String
    status: String
    drinkByDate: String
  }
`;
