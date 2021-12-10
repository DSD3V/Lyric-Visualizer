import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSavedSongsState = (state: RootState) => state.savedSongs;

export const selectGetSavedSongsHasError = createSelector(
  [selectSavedSongsState],
  state => state.hasError
);

export const selectGetSavedSongsIsLoading = createSelector(
  [selectSavedSongsState],
  state => state.isLoading
);

export const selectSavedSongs = createSelector(
  [selectSavedSongsState],
  state => state.savedSongs
);
