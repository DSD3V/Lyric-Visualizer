import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { getSavedSongs } from '../actions/savedSongsActions';
import { PageNotFound } from './PageNotFound';
import {
  selectSavedSongsIsLoading,
  selectSavedSongs,
} from '../selectors/savedSongsSelectors';
import { selectUserId } from '../selectors/userSelectors';
import { SongInGrid } from './SongInGrid';
import { useAppDispatch, useAppSelector } from '../store';
import { Container } from '../styles/GlobalStyles';
import { SavedSongsGrid } from '../styles/SavedSongsStyles';
import { SavedSongWordCloud } from './wordclouds/SavedSongWordCloud';

export const SavedSongs = () => {
  const dispatch = useAppDispatch();
  const savedSongs = useAppSelector(selectSavedSongs);
  const savedSongsIsLoading = useAppSelector(selectSavedSongsIsLoading);
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    dispatch(getSavedSongs(userId));
  }, [dispatch, userId]);

  return (
    <Container>
      <h2 className='mt-2'>Saved Song WordClouds</h2>
      {savedSongsIsLoading ? (
        <div>Getting Saved Songs...</div>
      ) : (
        <Routes>
          <Route
            path='/'
            element={
              <SavedSongsGrid>
                {savedSongs.map(song => (
                  <SongInGrid key={song.id} {...song} />
                ))}
              </SavedSongsGrid>
            }
          />
          {savedSongs.map(song => (
            <Route
              path={`/${song.id}`}
              element={<SavedSongWordCloud song={song} />}
              key={song.id}
            />
          ))}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </Container>
  );
};
