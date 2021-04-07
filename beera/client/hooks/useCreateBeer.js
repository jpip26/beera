import { useState } from 'react';

import useMutation from '../graphql/useMutation';
import createBeerMutation from '../graphql/mutations/createBeer';

const defaultBeer = { name: '', drinkByDate: '' };

const useCreateBeer = () => {
  const { mutate } = useMutation(createBeerMutation);
  const [beer, setBeer] = useState(defaultBeer);
  const createBeer = () => {
    if (beer.name !== '') {
      mutate(beer);
      setBeer(defaultBeer);
    }
  };
  const updateBeer = (field) => (e) => {
    const { value } = e.target;
    setBeer((prevBeer) => ({
      ...prevBeer,
      [field]: value,
    }));
  };

  return { createBeer, beer, updateBeer };
};

export default useCreateBeer;
