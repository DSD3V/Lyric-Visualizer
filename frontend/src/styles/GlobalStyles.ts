import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 1% auto 0 auto;
  padding: 0 3% 0 3%;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
`;
