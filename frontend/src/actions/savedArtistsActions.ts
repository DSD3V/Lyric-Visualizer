import { createAction, Dispatch } from '@reduxjs/toolkit';

export const GET_SAVED_ARTISTS_FAILED = createAction(
  'GET_SAVED_ARTISTS_FAILED'
);
export const GET_SAVED_ARTISTS_STARTED = createAction(
  'GET_SAVED_ARTISTS_STARTED'
);
export const GET_SAVED_ARTISTS_SUCCEEDED = createAction(
  'GET_SAVED_ARTISTS_SUCCEEDED',
  savedArtists => ({
    payload: savedArtists,
  })
);

export const getSavedArtists =
  (userEmail: string) => async (dispatch: Dispatch) => {
    dispatch(GET_SAVED_ARTISTS_STARTED());

    //TO-DO: Get saved artists for this user
    const savedArtists = await Promise.resolve();
    dispatch(GET_SAVED_ARTISTS_SUCCEEDED(savedArtists));

    //dispatch(GET_SAVED_ARTISTS_FAILED);
  };
