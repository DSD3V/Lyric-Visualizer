import { createAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

export const SONG_SEARCH_FAILED = createAction(
  'SONG_SEARCH_FAILED',
  errorMessage => ({
    payload: { errorMessage },
  })
);
export const SONG_SEARCH_STARTED = createAction('SONG_SEARCH_STARTED');
export const SONG_SEARCH_SUCCEEDED = createAction(
  'SONG_SEARCH_SUCCEEDED',
  searchResult => ({
    payload: { searchResult },
  })
);

export const getSongSearchResult =
  ({ artist, song }: { artist: string; song: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(SONG_SEARCH_STARTED());

    //TO-DO: Get search result from B.E
    try {
      const {
        data: { data: searchResult },
      } = await axios.get('/songSearch', {
        params: { artistName: artist, songName: song },
      });
      dispatch(
        !!searchResult
          ? SONG_SEARCH_SUCCEEDED(searchResult)
          : SONG_SEARCH_FAILED("Couldn't find lyrics for this song.")
      );
    } catch {
      dispatch(SONG_SEARCH_FAILED('Failed to retrieve song lyrics.'));
    }
  };
