import styled from 'styled-components';

import { colors, NAV_HEIGHT } from './constants';
import { StyledLink } from './GlobalStyles';

export const Divider = styled.span`
  margin: 0 3% 0 3%;
  opacity: 0.5;
  transform: scale(0.8, 2);
`;

export const TabButton = styled(StyledLink)<{
  $isSelected: boolean;
}>`
  border-bottom: ${({ $isSelected }) =>
    $isSelected && `1px solid ${colors.LINK_BLUE}`};
  font-size: 1.2rem;
  padding: 0 2px 1px 2px;
  transition: 0.3s;

  :hover {
    color: ${colors.HOVER_BLUE};
  }
`;

export const TabsDiv = styled.div`
  align-items: center;
  background-color: ${colors.LIGHT_GREY};
  display: flex;
  height: ${NAV_HEIGHT}px;
  justify-content: center;
  margin-top: ${NAV_HEIGHT}px;
`;
