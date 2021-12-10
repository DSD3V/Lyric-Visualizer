import { createAction, Dispatch } from '@reduxjs/toolkit';

export const ARTIST_SEARCH_FAILED = createAction('ARTIST_SEARCH_FAILED');
export const ARTIST_SEARCH_STARTED = createAction('ARTIST_SEARCH_STARTED');
export const ARTIST_SEARCH_SUCCEEDED = createAction(
  'ARTIST_SEARCH_SUCCEEDED',
  searchResults => ({
    payload: searchResults,
  })
);

export const searchArtist =
  (searchInput: { artist: string }) => async (dispatch: Dispatch) => {
    dispatch(ARTIST_SEARCH_STARTED());

    //TO-DO: Try searching for artist
    const searchResults = await Promise.resolve();
    dispatch(ARTIST_SEARCH_SUCCEEDED(searchResults));

    //dispatch(ARTIST_SEARCH_FAILED);
  };
