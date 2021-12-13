import styled from 'styled-components';

export const SavedSongsGrid = styled.div`
  align-items: center;
  display: grid;
  grid-auto-rows: minmax(300px, auto);
  grid-gap: 2em;
  grid-template-columns: repeat(2, 0.5fr);
  justify-items: center;
  margin: 0 auto;
  width: 50%;
`;
