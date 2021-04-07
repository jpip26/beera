import { useRouter } from 'next/router';
import styled from 'styled-components';

import Header from '../../components/Header';
import withQuery from '../../graphql/withQuery';
import beerByIdQuery from '../../graphql/queries/beerById';
import Button from '../../style/Button';
import Container from '../../style/Container';
import SingleLineInput from '../../style/SingleLineInput';
import useEditBeer from '../../hooks/useEditBeer';

const Page = styled(Container)`
  flex-direction: row;
  height: calc(100vh - 4em);
  width: 100vw;
  justify-content: flex-start;
  align-items: flex-start;
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    justify-content: flex-end;
  }
`;

const Column = styled(Container)`
  flex-direction: column;
  width: ${({ width }) => width};
  padding: ${({ theme }) => theme.sizing.s};
  height: 100%;
  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    max-height: 50%;
  }
`;

const BeerImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: contain;
`;

const BeerContent = ({ beer }) => {
  const { beerContent, updateBeer, submitBeer } = useEditBeer(beer);
  return (
    <>
      <Header />
      <Page>
        <Column width="40%">
          <BeerImage src={beer.imageUrl} />
        </Column>
        <Column width="40%">
          <SingleLineInput
            onChange={updateBeer('name')}
            type="Text"
            placeholder="Beer name"
            value={beerContent.name}
          />
          <SingleLineInput
            onChange={updateBeer('description')}
            type="Text"
            placeholder="Beer description"
            value={beerContent.description ?? ''}
          />
          <SingleLineInput
            onChange={updateBeer('drinkByDate')}
            type="datetime-local"
            placeholder="Drink by date"
            value={beerContent.drinkByDate ?? ''}
          />
          <Button onClick={submitBeer}>
            Update Beer
          </Button>
        </Column>
      </Page>
    </>
  );
};

const Beer = () => {
  const router = useRouter();
  const { id } = router.query;
  const WrappedBeerContent = withQuery(BeerContent, beerByIdQuery, { id });
  return (<WrappedBeerContent />);
};

export default Beer;
