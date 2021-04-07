import styled from 'styled-components';
import Header from '../../components/Header';

import Container from '../../style/Container';

const OneWayRoadToBeer = styled.iframe`
  width: 600px;
  height: 100%;
  padding: ${({ theme }) => theme.sizing.m};
  box-sizing: border-box;
  border: none;
  border-radius: 5px;
  margin: 0px;
  padding: 0px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const CountdownContainer = styled(Container)`
  width: 100vw;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const BeerCountdown = () => (
  <>
    <Header />
    <CountdownContainer>
      <OneWayRoadToBeer
        src="https://onewayroadtobeer.com/"
        title="One way road to beer"
        rel="Stylesheet"
        href="Style/iframe.css"
      />
    </CountdownContainer>
  </>
);

export default BeerCountdown;
