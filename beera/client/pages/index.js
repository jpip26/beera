import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import Header from '../components/Header';
import BeerContainer from '../components/BeerContainer';
import withQuery from '../graphql/withQuery';
import beersQuery from '../graphql/queries/beers';
import Container from '../style/Container';
import useSortedBeers from '../hooks/useSortedBeers';

const Page = styled(Container)`
  height: calc(100vh - 4em);
  justify-content: space-between;
  width: 100vw;
`;

const BeersPage = ({ beers }) => {
  const { handleDrag, sortedBeers } = useSortedBeers(beers);
  return (
    <>
      <Header />
      <Page>
        <DragDropContext onDragEnd={handleDrag}>
          <BeerContainer dropAreaId="NOT_DRUNK" title="Not Drunk" beers={sortedBeers.NOT_DRUNK} />
          <BeerContainer dropAreaId="DRINKING" title="Drinking" beers={sortedBeers.DRINKING} />
          <BeerContainer dropAreaId="DRUNK" title="Drunk" beers={sortedBeers.DRUNK} />
        </DragDropContext>
      </Page>
    </>
  );
};

export default withQuery(BeersPage, beersQuery);
