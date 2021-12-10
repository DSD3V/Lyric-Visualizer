import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSavedArtistsState = (state: RootState) => state.savedArtists;

export const selectGetSavedArtistsHasError = createSelector(
  [selectSavedArtistsState],
  state => state.hasError
);

export const selectGetSavedArtistsIsLoading = createSelector(
  [selectSavedArtistsState],
  state => state.isLoading
);

export const selectSavedArtists = createSelector(
  [selectSavedArtistsState],
  state => state.savedArtists
);
