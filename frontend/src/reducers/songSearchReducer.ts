import { createReducer } from '@reduxjs/toolkit';

import {
  SONG_SEARCH_FAILED,
  SONG_SEARCH_STARTED,
  SONG_SEARCH_SUCCEEDED,
} from '../actions/songSearchActions';

interface SongSearchState {
  hasError: boolean;
  isLoading: boolean;
  searchResults: {};
}

const initialState = {
  hasError: false,
  isLoading: false,
  searchResults: {},
} as SongSearchState;

export const songSearchReducer = createReducer(initialState, builder => {
  builder
    .addCase(SONG_SEARCH_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(SONG_SEARCH_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(SONG_SEARCH_SUCCEEDED, (state, action) => {
      state.searchResults = action.payload.searchResults;
      state.isLoading = false;
    });
});
