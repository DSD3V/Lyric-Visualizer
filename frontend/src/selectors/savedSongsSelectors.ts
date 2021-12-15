import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectSavedSongsState = (state: RootState) => state.savedSongs;

export const selectLastDeletedSongId = createSelector(
  [selectSavedSongsState],
  state => state.lastDeletedSongId
);

export const selectSavedSongs = createSelector(
  [selectSavedSongsState],
  state => state.savedSongs
);

export const selectSavedSongsErrorMessage = createSelector(
  [selectSavedSongsState],
  state => state.errorMessage
);

export const selectSavedSongsIsDeleteLoading = createSelector(
  [selectSavedSongsState],
  state => state.isDeleteLoading
);

export const selectSavedSongsIsLoading = createSelector(
  [selectSavedSongsState],
  state => state.isLoading
);

export const selectSavedSongsSuccessMessage = createSelector(
  [selectSavedSongsState],
  state => state.successMessage
);
