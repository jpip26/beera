import { pickBy } from 'lodash';
import { useEffect, useState } from 'react';

import useMutation from '../graphql/useMutation';
import editBeerMutation from '../graphql/mutations/editBeer';

const sanitise = (data) => pickBy(data, (_, key) => key !== '__typename');

const beersWithStatus = (beers, targetStatus) => beers.filter(({ status }) => status === targetStatus);

const sortBeers = (beers) => ({
  NOT_DRUNK: beersWithStatus(beers, 'NOT_DRUNK'),
  DRINKING: beersWithStatus(beers, 'DRINKING'),
  DRUNK: beersWithStatus(beers, 'DRUNK'),
});

const useSortedBeers = (beers) => {
  const { mutate } = useMutation(editBeerMutation);
  const [sortedBeers, setSortedBeers] = useState(sortBeers(beers));
  useEffect(() => setSortedBeers(sortBeers(beers)), [beers]);

  const handleDrag = ({ source, destination }) => {
    if (source && destination) {
      setSortedBeers((prevBeers) => {
        const updatedBeer = {
          ...prevBeers[source.droppableId][source.index],
          status: destination.droppableId,
        };
        mutate({ beer: sanitise(updatedBeer) });
        const updatedBeers = { ...prevBeers };
        updatedBeers[source.droppableId].splice(source.index, 1);
        updatedBeers[destination.droppableId].splice(destination.index, 0, updatedBeer);
        return updatedBeers;
      });
    }
  };

  return { handleDrag, sortedBeers };
};

export default useSortedBeers;
