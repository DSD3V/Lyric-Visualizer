import { createReducer } from '@reduxjs/toolkit';

import {
  ARTIST_SEARCH_FAILED,
  ARTIST_SEARCH_STARTED,
  ARTIST_SEARCH_SUCCEEDED,
} from '../actions/artistSearchActions';

const initialState = {
  hasError: false,
  isLoading: false,
  searchResults: {},
} as {
  hasError: boolean;
  isLoading: boolean;
  searchResults: {};
};

export const artistSearchReducer = createReducer(initialState, builder => {
  builder
    .addCase(ARTIST_SEARCH_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(ARTIST_SEARCH_STARTED, state => {
      state.hasError = false;
      state.isLoading = true;
    })

    .addCase(ARTIST_SEARCH_SUCCEEDED, (state, action) => {
      state.hasError = false;
      state.isLoading = false;
      state.searchResults = action.payload.searchResults;
    });
});
