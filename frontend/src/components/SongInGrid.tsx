import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  ArtistName,
  SavedSongDiv,
  SavedSongImg,
  SavedSongName,
  TitleDiv,
} from '../styles/SavedSongsStyles';

export const SongInGrid = ({
  artistName,
  id,
  imageUrl,
  songName,
}: {
  artistName: string;
  id: string;
  imageUrl: string;
  songName: string;
}) => {
  const navigate = useNavigate();

  const handleSavedSongClicked = useCallback(
    () => navigate(`/saved-songs/${id}`),
    []
  );

  return (
    <SavedSongDiv onClick={handleSavedSongClicked}>
      <TitleDiv>
        <SavedSongName>{songName}</SavedSongName>
        <ArtistName>{artistName}</ArtistName>
      </TitleDiv>
      <SavedSongImg alt='song cover' key={imageUrl} src={imageUrl} />
    </SavedSongDiv>
  );
};
