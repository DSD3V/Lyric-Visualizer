import { createReducer } from '@reduxjs/toolkit';

import {
  CLEAR_FORM,
  LOG_IN_FAILED,
  LOG_IN_STARTED,
  LOG_IN_SUCCEEDED,
  LOG_OUT_FAILED,
  LOG_OUT_STARTED,
  LOG_OUT_SUCCEEDED,
  RESET_PASSWORD_FAILED,
  RESET_PASSWORD_STARTED,
  RESET_PASSWORD_SUCCEEDED,
  SIGN_UP_FAILED,
  SIGN_UP_STARTED,
  SIGN_UP_SUCCEEDED,
  UPDATE_ACCOUNT_SETTINGS_FAILED,
  UPDATE_ACCOUNT_SETTINGS_SUCCEEDED,
  UPDATE_ACCOUNT_SETTINGS_STARTED,
} from '../actions/userActions';

const initialState = {
  errorMessage: '',
  isLoading: false,
  successMessage: '',
  userData: {
    email: '',
    id: '',
    token: localStorage.getItem('token'),
  },
} as {
  errorMessage: string;
  isLoading: boolean;
  successMessage: '';
  userData: {
    email: string;
    id: string;
    token: string;
  };
};

export const userReducer = createReducer(initialState, builder => {
  builder
    .addCase(CLEAR_FORM, state => {
      state.errorMessage = '';
      state.isLoading = false;
      state.successMessage = '';
    })

    .addCase(LOG_IN_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(LOG_IN_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(LOG_IN_SUCCEEDED, (state, action) => {
      localStorage.setItem('token', action.payload.userData.token);
      state.errorMessage = '';
      state.isLoading = false;
      state.userData = {
        ...action.payload.userData,
        token: action.payload.userData.token,
      };
    })

    .addCase(LOG_OUT_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(LOG_OUT_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(LOG_OUT_SUCCEEDED, state => {
      localStorage.removeItem('token');
      state.errorMessage = '';
      state.isLoading = false;
      state.userData.token = '';
    })

    .addCase(RESET_PASSWORD_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(RESET_PASSWORD_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.successMessage = action.payload.successMessage;
    })

    .addCase(RESET_PASSWORD_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(SIGN_UP_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(SIGN_UP_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(SIGN_UP_SUCCEEDED, (state, action) => {
      localStorage.setItem('token', action.payload.userData.token);
      state.errorMessage = '';
      state.isLoading = false;
      state.userData = {
        ...action.payload.userData,
        token: action.payload.userData.token,
      };
    })

    .addCase(UPDATE_ACCOUNT_SETTINGS_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(UPDATE_ACCOUNT_SETTINGS_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(UPDATE_ACCOUNT_SETTINGS_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.successMessage = action.payload.successMessage;
      state.userData.email = action.payload.newEmail || state.userData.email;
    });
});
