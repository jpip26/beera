import styled from 'styled-components';

import Header from '../../components/Header';
import useCreateBeer from '../../hooks/useCreateBeer';
import Button from '../../style/Button';
import Container from '../../style/Container';
import SingleLineInput from '../../style/SingleLineInput';

const Page = styled(Container)`
  flex-direction: row;
  height: calc(100vh - 4em);
  width: 100vw;
`;

const Column = styled(Container)`
  flex-direction: column;
  width: 50%;
  padding: ${({ theme }) => theme.sizing.s};
  height: 100%;
`;

const BeerImage = styled.img`
  height: auto;
  width: 100%;
  object-fit: contain;
`;

const CreateBeer = () => {
  const { createBeer, beer, updateBeer } = useCreateBeer();
  return (
    <>
      <Header />
      <Page>
        <Column>
          <BeerImage src={beer.imageUrl} />
        </Column>
        <Column>
          <SingleLineInput
            onChange={updateBeer('name')}
            type="Text"
            placeholder="Beer name"
            value={beer.name}
          />
          <SingleLineInput
            onChange={updateBeer('drinkByDate')}
            type="datetime-local"
            placeholder="Drink by date"
            value={beer.drinkByDate ?? ''}
          />
          <Button onClick={createBeer}>
            Craft Beer
          </Button>
        </Column>
      </Page>
    </>
  );
};

export default CreateBeer;
