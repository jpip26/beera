import { useRouter } from 'next/router';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import Paragraph from '../style/Paragraph';

import Title from '../style/Title';

const Card = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  border: 0px;
  border-radius: 5px;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 6em 1fr;
  grid-template-rows: 1fr 1fr auto;
  column-gap: ${({ theme }) => theme.sizing.xs};
  width: 100%;
  padding: ${({ theme }) => theme.sizing.xs};
  margin-bottom: ${({ theme }) => theme.sizing.xs};
  &:hover {
    background-color: ${({ theme }) => theme.palette.secondary.tint};
  }
  &:active {
    border: 2px solid ${({ theme }) => theme.palette.secondary.standard};
  }
`;

const CardTitle = styled(Title)`
  color: ${({ theme }) => theme.palette.secondary.dark};
  font-size: ${({ theme }) => theme.sizing.m};
`;

const CardText = styled(Paragraph)`
  color: ${({ theme }) => theme.palette.secondary.standard};
  font-size: ${({ theme }) => theme.sizing.s};
`;

const GridItem = styled.div`
  grid-area: ${({ area }) => area};
`;

const BeerImage = styled.img`
  width: 100%;
  height: 100%;
  max-height: 60px;
  object-fit: cover;
  border-radius: 5px;
  object-position: right calc(100% + 50px);
`;

const BeerCard = ({ index, beer }) => {
  const router = useRouter();
  return (
    <Draggable draggableId={beer.id} index={index} disableInteractiveElementBlocking>
      {(draggableProvided) => (
        <div
          ref={draggableProvided.innerRef}
          style={{ marginBottom: '10px' }}
          {...draggableProvided.draggableProps}
          {...draggableProvided.dragHandleProps}
        >
          <Card onClick={() => router.push(`/beer/${beer.id}`)}>
            <GridItem area="1 / 1 / 3 / 1">
              <BeerImage src={beer.imageUrl} />
            </GridItem>
            <GridItem area="1 / 2 / 3 / 3">
              <CardTitle>{beer.name}</CardTitle>
              {beer?.description && (
                <CardText>{beer.description}</CardText>
              )}
            </GridItem>
            {beer.drinkByDate && (
              <GridItem area="3 / 1 / end / end">
                <CardText>
                  This beer must be consumed on:
                  &nbsp;
                  <strong>{(new Date(beer.drinkByDate)).toLocaleString()}</strong>
                </CardText>
              </GridItem>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  );
};

export default BeerCard;
