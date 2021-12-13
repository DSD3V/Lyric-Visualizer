import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSongSearchState = (state: RootState) => state.songSearch;

export const selectSongSearchErrorMessage = createSelector(
  [selectSongSearchState],
  state => state.errorMessage
);

export const selectSongSearchIsLoading = createSelector(
  [selectSongSearchState],
  state => state.isLoading
);

export const selectSongSearchResult = createSelector(
  [selectSongSearchState],
  state => state.searchResult
);
