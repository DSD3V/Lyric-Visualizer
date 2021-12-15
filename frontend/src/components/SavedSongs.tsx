import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

import { getSavedSongs } from '../actions/savedSongsActions';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { Song } from '../objects';
import { PageNotFound } from './PageNotFound';
import {
  selectLastDeletedSongId,
  selectSavedSongsIsLoading,
  selectSavedSongs,
} from '../selectors/savedSongsSelectors';
import { selectUserId } from '../selectors/userSelectors';
import { SongInGrid } from './SongInGrid';
import { Container } from '../styles/GlobalStyles';
import { SavedSongsGrid } from '../styles/SavedSongsStyles';
import { SavedSongWordCloud } from './wordclouds/SavedSongWordCloud';

export const SavedSongs = () => {
  const dispatch = useAppDispatch();
  const isSavedSongsLoading = useAppSelector(selectSavedSongsIsLoading);
  const lastDeletedSongId = useAppSelector(selectLastDeletedSongId);
  const savedSongs = useAppSelector(selectSavedSongs);
  const userId = useAppSelector(selectUserId);

  useEffect(() => {
    if (!savedSongs && !!userId) {
      dispatch(getSavedSongs(userId));
    }
  }, [dispatch, savedSongs, userId]);

  return (
    <Container>
      <h2 className='mt-2'>Saved Song WordClouds</h2>
      {isSavedSongsLoading ? (
        <div>Getting Saved Songs...</div>
      ) : (
        <Routes>
          <Route
            path='/'
            element={
              <SavedSongsGrid>
                {savedSongs?.map(
                  (song: Song) =>
                    !(lastDeletedSongId === song.songId) && (
                      <SongInGrid key={song.songId} {...song} />
                    )
                )}
              </SavedSongsGrid>
            }
          />
          {savedSongs?.map((song: Song) => (
            <Route
              path={`/${song.songId}`}
              element={<SavedSongWordCloud song={song} />}
              key={song.songId}
            />
          ))}
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      )}
    </Container>
  );
};
