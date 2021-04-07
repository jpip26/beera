import { useMutation as useGraphQLMutation } from '@apollo/client';

const useMutation = (mutation) => {
  const [processMutation, { data, error, loading }] = useGraphQLMutation(mutation);
  const mutate = (variables) => processMutation({ variables });
  return { data, error, loading, mutate };
};

export default useMutation;
