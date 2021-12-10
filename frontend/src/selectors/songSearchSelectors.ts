import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSongSearchState = (state: RootState) => state.songSearch;

export const selectSongSearchHasError = createSelector(
  [selectSongSearchState],
  state => state.hasError
);

export const selectSongSearchIsLoading = createSelector(
  [selectSongSearchState],
  state => state.isLoading
);

export const selectSongSearchResults = createSelector(
  [selectSongSearchState],
  state => state.searchResults
);
