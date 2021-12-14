import styled from 'styled-components';

import { colors } from './constants';
import { StyledLink } from './GlobalStyles';

export const ArtistName = styled.span`
  font-size: 1rem;
`;

export const ButtonsDiv = styled.div`
  display: flex;
  justify-content: space-between;
  width: 80%;
`;

export const ReturnLink = styled(StyledLink)`
  margin-left: 50%;
  padding-right: 20px;
  transform: translateX(-50%);
`;

export const SavedSongDiv = styled.div`
  align-items: center;
  background-color: ${colors.LIGHT_GREY};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 250px;
  justify-content: space-evenly;
  overflow-x: auto;
  padding: 1% 4% 0 4%;
  text-align: center;
  transition: 0.4s;
  width: 340px;

  :hover {
    background-color: ${colors.LIGHT_GREY_HOVER};
  }
`;

export const SavedSongImg = styled.img`
  height: 140px;
  margin-top: 5px;
  width: 180px;
`;

export const SavedSongName = styled.span`
  font-size: 1.4rem;
`;

export const SavedSongsGrid = styled.div`
  align-items: center;
  display: grid;
  gap: 10%;
  grid-auto-rows: max(300px, auto);
  grid-template-columns: repeat(auto-fill, 300px);
  justify-content: center;
  justify-items: center;
  margin: 2% auto;
  width: 80%;
`;

export const TitleDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
