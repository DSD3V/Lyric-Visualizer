import { createAction, Dispatch } from '@reduxjs/toolkit';

export const SONG_SEARCH_FAILED = createAction('SONG_SEARCH_FAILED');
export const SONG_SEARCH_STARTED = createAction('SONG_SEARCH_STARTED');
export const SONG_SEARCH_SUCCEEDED = createAction(
  'SONG_SEARCH_SUCCEEDED',
  searchResults => ({
    payload: searchResults,
  })
);

export const searchArtist =
  (searchInput: { artist: string; song: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(SONG_SEARCH_STARTED());

    //TO-DO: Try searching for song
    const searchResults = await Promise.resolve();
    dispatch(SONG_SEARCH_SUCCEEDED(searchResults));

    //dispatch(SONG_SEARCH_FAILED);
  };
