import { createReducer } from '@reduxjs/toolkit';

import {
  GET_SAVED_SONGS_FAILED,
  GET_SAVED_SONGS_STARTED,
  GET_SAVED_SONGS_SUCCEEDED,
} from '../actions/savedSongsActions';

const initialState = {
  errorMessage: '',
  isLoading: false,
  savedSongs: [],
} as {
  errorMessage: string;
  isLoading: boolean;
  savedSongs: [];
};

export const savedSongsReducer = createReducer(initialState, builder => {
  builder
    .addCase(GET_SAVED_SONGS_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(GET_SAVED_SONGS_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(GET_SAVED_SONGS_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.savedSongs = action.payload.savedSongs;
    });
});
