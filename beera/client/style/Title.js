import styled from 'styled-components';

const Title = styled.h1`
  color: ${({ theme }) => theme.palette.background};
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${({ theme }) => theme.sizing.xl};
  line-height: 1.4em;
  margin: 0;
`;

export default Title;
