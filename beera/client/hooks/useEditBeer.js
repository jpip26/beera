import { pickBy } from 'lodash';
import { useRouter } from 'next/router';
import { useState } from 'react';

import useMutation from '../graphql/useMutation';
import editBeerMutation from '../graphql/mutations/editBeer';

const sanitise = (data) => pickBy(data, (_, key) => key !== '__typename');

const useEditBeer = (beer) => {
  const router = useRouter();
  const { mutate } = useMutation(editBeerMutation);
  const [beerContent, setBeerContent] = useState(beer);
  const updateBeer = (field) => (e) => {
    const { value } = e.target;
    setBeerContent((prevBeer) => ({
      ...prevBeer,
      [field]: value,
    }));
  };
  const submitBeer = () => {
    if (beerContent.name !== '') {
      mutate({ beer: sanitise(beerContent) });
      router.back();
    }
  };

  return { beerContent, updateBeer, submitBeer };
};

export default useEditBeer;
