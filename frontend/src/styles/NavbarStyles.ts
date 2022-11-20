import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors, NAV_HEIGHT } from './constants';

export const Nav = styled.nav`
  align-items: center;
  background-color: ${colors.BLUE};
  display: flex;
  height: ${NAV_HEIGHT}px;
  justify-content: space-between;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
`;

export const NavButton = styled(Link)`
  border: 2px solid black;
  color: white;
  cursor: pointer;
  font-size: 0.85rem;
  font-weight: 500;
  height: 30px;
  margin: 0 5px 0 5px;
  padding: 3px 10px;
  text-align: center;
  text-decoration: none;

  :hover {
    color: white;
  }
`;

export const NavButtonsContainer = styled.div`
  align-items: center;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-right: 4%;
`;

export const NavButtonsDiv = styled.div`
  display: flex;
  margin-right: 3%;
  width: 100%;
`;

export const NavTitle = styled(Link)`
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  font-weight: 500;
  margin-left: 4%;
  text-decoration: none;

  :hover {
    color: white;
  }
`;

export const UserEmailSpan = styled.span`
  font-size: 0.85rem;
  margin-bottom: 3px;
`;
