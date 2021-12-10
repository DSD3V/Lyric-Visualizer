import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectArtistSearchState = (state: RootState) => state.artistSearch;

export const selectArtistSearchHasError = createSelector(
  [selectArtistSearchState],
  state => state.hasError
);

export const selectArtistSearchIsLoading = createSelector(
  [selectArtistSearchState],
  state => state.isLoading
);

export const selectArtistSearchResults = createSelector(
  [selectArtistSearchState],
  state => state.searchResults
);
