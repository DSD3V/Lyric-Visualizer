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
  imageUrl,
  songId,
  songName,
}: {
  artistName: string;
  imageUrl: string;
  songId: string;
  songName: string;
}) => {
  const navigate = useNavigate();

  const handleSavedSongClicked = useCallback(
    () => navigate(`/saved-songs/${songId}`),
    [songId, navigate]
  );

  return (
    <SavedSongDiv onClick={handleSavedSongClicked}>
      <TitleDiv>
        <SavedSongName>{songName}</SavedSongName>
        <ArtistName>{artistName}</ArtistName>
      </TitleDiv>
      <SavedSongImg alt='song cover' src={imageUrl} />
    </SavedSongDiv>
  );
};
