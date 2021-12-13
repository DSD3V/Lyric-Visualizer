import { useEffect } from 'react';

import { getSavedSongs } from '../actions/savedSongsActions';
import {
  selectSavedSongsIsLoading,
  selectSavedSongs,
} from '../selectors/savedSongsSelectors';
import { selectUserId } from '../selectors/userSelectors';
import { useAppDispatch, useAppSelector } from '../store';
import { Container } from 'react-bootstrap';
import { SavedSongsGrid } from '../styles/SavedSongsStyles';

export const SavedSongs = () => {
  const dispatch = useAppDispatch();
  const savedSongsIsLoading = useAppSelector(selectSavedSongsIsLoading);
  const savedSongs = useAppSelector(selectSavedSongs);
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    dispatch(getSavedSongs(userId));
  }, [dispatch, userId]);

  return (
    <Container>
      <SavedSongsGrid>
        {savedSongsIsLoading ? (
          <div>Getting Saved Songs...</div>
        ) : (
          savedSongs.map((song: { imageUrl: string }) => (
            <img
              alt='song cover'
              height={50}
              key={song.imageUrl}
              src={song.imageUrl}
              width={50}
            />
          ))
        )}
      </SavedSongsGrid>
    </Container>
  );
};
