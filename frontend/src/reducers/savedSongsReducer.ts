import { createReducer } from '@reduxjs/toolkit';

import {
  GET_SAVED_SONGS_FAILED,
  GET_SAVED_SONGS_STARTED,
  GET_SAVED_SONGS_SUCCEEDED,
} from '../actions/savedSongsActions';

interface SavedSongsState {
  hasError: boolean;
  isLoading: boolean;
  savedSongs: [];
}

const initialState = {
  hasError: false,
  isLoading: false,
  savedSongs: [],
} as SavedSongsState;

export const savedSongsReducer = createReducer(initialState, builder => {
  builder
    .addCase(GET_SAVED_SONGS_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(GET_SAVED_SONGS_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(GET_SAVED_SONGS_SUCCEEDED, (state, action) => {
      state.savedSongs = action.payload.savedSongs;
      state.isLoading = false;
    });
});
