import { useQuery } from '@apollo/client';

const withQuery = (Component, query, variables = {}) => {
  const WrappedComponent = () => {
    const { data, error, loading } = useQuery(query, { variables, fetchPolicy: 'cache-and-network' });
    if (data) return (<Component {...data} />);
    if (error) return (<p>Error: {error.graphQLErrors.map(({ message }, i) => (<span key={i}>{message}</span>))}</p>);
    if (loading) return (<p>Loading!</p>);
    return null;
  };
  return WrappedComponent;
};

export default withQuery;
