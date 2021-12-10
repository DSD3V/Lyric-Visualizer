import { createReducer } from '@reduxjs/toolkit';

import {
  GET_SAVED_ARTISTS_FAILED,
  GET_SAVED_ARTISTS_STARTED,
  GET_SAVED_ARTISTS_SUCCEEDED,
} from '../actions/savedArtistsActions';

interface SavedArtistsState {
  hasError: boolean;
  isLoading: boolean;
  savedArtists: [];
}

const initialState = {
  hasError: false,
  isLoading: false,
  savedArtists: [],
} as SavedArtistsState;

export const savedArtistsReducer = createReducer(initialState, builder => {
  builder
    .addCase(GET_SAVED_ARTISTS_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(GET_SAVED_ARTISTS_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(GET_SAVED_ARTISTS_SUCCEEDED, (state, action) => {
      state.savedArtists = action.payload.savedArtists;
      state.isLoading = false;
    });
});
