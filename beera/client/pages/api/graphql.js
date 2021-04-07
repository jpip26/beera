import { ApolloServer, gql } from 'apollo-server-micro';

const mockBeers = [
  { id: 'BEER-1', name: 'Beer 1', description: 'This is the first test beer', status: 'DRINKING', imageUrl: 'https://images.punkapi.com/v2/195.png' },
  { id: 'BEER-2', name: 'Beer 2', description: 'This is the second test beer', status: 'DRUNK', imageUrl: 'https://images.punkapi.com/v2/192.png' },
  { id: 'BEER-3', name: 'Beer 3', status: 'NOT_DRUNK', drinkByDate: '03/09/2021', imageUrl: 'https://images.punkapi.com/v2/215.png' },
];

const typeDefs = gql`
  type Mutation {
    createBeer(name: String!, drinkByDate: String): Beer!
    editBeer(beer: BeerInput!): Beer!
  }
  type Query {
    beer(id: String!): Beer!
    beers: [Beer!]!
  }
  input BeerInput {
    id: String
    name: String!
    description: String
    imageUrl: String
    status: String
    drinkByDate: String
  }
  type Beer {
    id: String!
    name: String!
    description: String
    imageUrl: String
    status: String!
    drinkByDate: String
  }
`;

const resolvers = {
  Mutation: {
    createBeer(_, { name, description }) {
      const fullBeer = { name, description, id: `BEER-${mockBeers.length + 1}`, status: 'NOT_DRUNK' };
      console.log('Creating beer', fullBeer);
      mockBeers.push(fullBeer);
      return fullBeer;
    },
    editBeer(_, { beer }) {
      console.log('Editing beer', beer);
      const beerIndex = mockBeers.findIndex(({ id }) => id === beer.id);
      mockBeers[beerIndex] = { ...beer };
      return { ...beer };
    },
  },
  Query: {
    beer(_, { id }) {
      return mockBeers.find(({ id: beerId }) => beerId === id);
    },
    beers() {
      return mockBeers;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });

export const config = { api: { bodyParser: false } };

export default apolloServer.createHandler({ path: '/api/graphql' });
