import { createReducer } from '@reduxjs/toolkit';

import {
  LOG_IN_FAILED,
  LOG_IN_STARTED,
  LOG_IN_SUCCEEDED,
  LOG_OUT_FAILED,
  LOG_OUT_STARTED,
  LOG_OUT_SUCCEEDED,
  SIGN_UP_FAILED,
  SIGN_UP_STARTED,
  SIGN_UP_SUCCEEDED,
} from '../actions/userActions';

interface UserState {
  hasError: boolean;
  isLoading: boolean;
  userData: {
    email: string;
    isLoggedIn: boolean;
  };
}

const initialState = {
  hasError: false,
  isLoading: false,
  userData: {
    email: '',
    isLoggedIn: false,
  },
} as UserState;

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(LOG_IN_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(LOG_IN_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(LOG_IN_SUCCEEDED, (state, action) => {
      state.userData = { ...action.payload.userData, isLoggedIn: true };
      state.isLoading = false;
    })

    .addCase(LOG_OUT_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(LOG_OUT_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(LOG_OUT_SUCCEEDED, state => {
      state.userData.isLoggedIn = false;
      state.isLoading = false;
    })

    .addCase(SIGN_UP_FAILED, state => {
      state.hasError = true;
      state.isLoading = false;
    })

    .addCase(SIGN_UP_STARTED, state => {
      state.isLoading = true;
    })

    .addCase(SIGN_UP_SUCCEEDED, (state, action) => {
      state.userData = { ...action.payload.userData, isLoggedIn: true };
      state.isLoading = false;
    });
});
