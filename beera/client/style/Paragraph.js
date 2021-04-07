import styled from 'styled-components';

const Paragraph = styled.p`
  color: ${({ theme }) => theme.palette.background};
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${({ theme }) => theme.sizing.m};
  line-height: 1.2em;
  margin: 0;
`;

export default Paragraph;
