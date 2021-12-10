import { createReducer } from '@reduxjs/toolkit';

import {
  ARTIST_SEARCH_FAILED,
  ARTIST_SEARCH_STARTED,
  ARTIST_SEARCH_SUCCEEDED,
} from '../actions/artistSearchActions';

interface ArtistSearchState {
  hasError: boolean;
  isLoading: boolean;
  searchResults: {};
}

const initialState = {
  hasError: false,
  isLoading: false,
  searchResults: {},
} as ArtistSearchState;

export const artistSearchReducer = createReducer(initialState, builder => {
  builder
    .addCase(ARTIST_SEARCH_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(ARTIST_SEARCH_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(ARTIST_SEARCH_SUCCEEDED, (state, action) => {
      state.searchResults = action.payload.searchResults;
      state.isLoading = false;
    });
});
