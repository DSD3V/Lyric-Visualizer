import { createAction, Dispatch } from '@reduxjs/toolkit';

export const GET_SAVED_SONGS_FAILED = createAction('GET_SAVED_SONGS_FAILED');
export const GET_SAVED_SONGS_STARTED = createAction('GET_SAVED_SONGS_STARTED');
export const GET_SAVED_SONGS_SUCCEEDED = createAction(
  'GET_SAVED_SONGS_SUCCEEDED',
  savedSongs => ({
    payload: savedSongs,
  })
);

export const getSavedSongs =
  (userEmail: string) => async (dispatch: Dispatch) => {
    dispatch(GET_SAVED_SONGS_STARTED());

    //TO-DO: Get saved songs for this user
    const savedSongs = await Promise.resolve();
    dispatch(GET_SAVED_SONGS_SUCCEEDED(savedSongs));

    //dispatch(GET_SAVED_SONGS_FAILED);
  };
