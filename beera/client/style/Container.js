import styled from 'styled-components';

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.background};
  border: 0px;
  box-sizing: border-box;
  display: flex;
  padding: ${({ theme }) => theme.sizing.xs};
`;

export default Container;
