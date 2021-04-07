import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { useMemo } from 'react';

let client;

const isSSR = () => typeof window === 'undefined';

const createApolloClient = () => new ApolloClient({
  ssrMode: isSSR(),
  link: new HttpLink({ uri: process.env.NEXT_PUBLIC_BEERA_API_URL }),
  cache: new InMemoryCache(),
});

const initialiseApollo = (initialState = null) => {
  const _apolloClient = client ?? createApolloClient();
  if (initialState) {
    const existingCache = _apolloClient.extract();
    _apolloClient.cache.restore({ ...existingCache, ...initialState });
  }
  if (isSSR()) return _apolloClient;
  if (!client) client = _apolloClient;
  return _apolloClient;
};

const useApollo = (initialState) => {
  const store = useMemo(() => initialiseApollo(initialState), [initialState]);
  return store;
};

export default useApollo;
