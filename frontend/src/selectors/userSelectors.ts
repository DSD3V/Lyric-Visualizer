import { createSelector } from '@reduxjs/toolkit';

import { RootState } from '../store';

const selectUserState = (state: RootState) => state.user;

export const selectUserData = createSelector(
  [selectUserState],
  state => state.userData
);

export const selectUserHasError = createSelector(
  [selectUserState],
  state => state.hasError
);

export const selectUserIsLoading = createSelector(
  [selectUserState],
  state => state.isLoading
);

export const selectUserIsLoggedIn = createSelector(
  [selectUserData],
  state => state.isLoggedIn
);
