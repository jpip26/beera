import styled from 'styled-components';

const Button = styled.button`
  appearance: none;
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  border: 0px;
  border-radius: 3px;
  color: ${({ theme }) => theme.palette.background};
  cursor: pointer;
  font-size: ${({ theme }) => theme.sizing.m};
  font-weight: 700;
  padding: ${({ theme }) => theme.sizing.xs};
  width: auto;
`;

export default Button;
