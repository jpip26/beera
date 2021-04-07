import styled from 'styled-components';

const SingleLineInput = styled.input`
  background: ${({ theme }) => theme.palette.background};
  border-color: ${({ theme }) => theme.palette.primary.light};
  border-radius: 5px;
  color: ${({ theme }) => theme.palette.secondary.standard};
  font-family: Arial, Helvetica, sans-serif;
  font-size: ${({ theme }) => theme.sizing.m};
  margin: ${({ theme }) => theme.sizing.xs};
  outline: none;
  padding: ${({ theme }) => theme.sizing.xs};
  ::placeholder {
    color: ${({ theme }) => theme.palette.primary.standard};
  }
`;

export default SingleLineInput;
