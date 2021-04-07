import { Droppable } from 'react-beautiful-dnd';
import styled from 'styled-components';

import DefaultContainer from '../style/Container';
import Title from '../style/Title';
import BeerCard from './BeerCard';

const Container = styled(DefaultContainer)`
  background-color: ${({ theme }) => theme.palette.secondary.light};
  border-radius: 5px;
  flex-direction: column;
  width: 32vw;
`;

const ContainerTitle = styled(Title)`
  color: ${({ theme }) => theme.palette.secondary.dark};
  font-size: ${({ theme }) => theme.sizing.l};
`;

const InnerDroppable = styled(DefaultContainer)`
  background-color: transparent;
  display: block;
  width: 100%;
  height: 0px;
  flex: 1;
`;

const BeerContainer = ({ dropAreaId, beers, title }) => (
  <Container>
    <ContainerTitle>{title}</ContainerTitle>
    <Droppable droppableId={dropAreaId}>
      {(provided) => (
        <InnerDroppable ref={provided.innerRef} {...provided.droppableProps}>
          {beers.map((beer, index) => (<BeerCard key={beer.id} beer={beer} index={index} />))}
          {provided.placeholder}
        </InnerDroppable>
      )}
    </Droppable>
  </Container>
);

export default BeerContainer;
