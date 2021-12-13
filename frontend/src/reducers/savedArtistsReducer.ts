import { createReducer } from '@reduxjs/toolkit';

import {
  GET_SAVED_ARTISTS_FAILED,
  GET_SAVED_ARTISTS_STARTED,
  GET_SAVED_ARTISTS_SUCCEEDED,
} from '../actions/savedArtistsActions';

const initialState = {
  hasError: false,
  isLoading: false,
  savedArtists: [],
} as {
  hasError: boolean;
  isLoading: boolean;
  savedArtists: [];
};

export const savedArtistsReducer = createReducer(initialState, builder => {
  builder
    .addCase(GET_SAVED_ARTISTS_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(GET_SAVED_ARTISTS_STARTED, state => {
      state.hasError = false;
      state.isLoading = true;
    })

    .addCase(GET_SAVED_ARTISTS_SUCCEEDED, (state, action) => {
      state.hasError = false;
      state.isLoading = false;
      state.savedArtists = action.payload.savedArtists;
    });
});
