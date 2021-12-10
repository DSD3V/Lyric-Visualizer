import { createAction, Dispatch } from '@reduxjs/toolkit';

export const LOG_IN_FAILED = createAction('LOG_IN_FAILED');
export const LOG_IN_STARTED = createAction('LOG_IN_STARTED');
export const LOG_IN_SUCCEEDED = createAction('LOG_IN_SUCCEEDED', userData => ({
  payload: userData,
}));

export const LOG_OUT_FAILED = createAction('LOG_OUT_FAILED');
export const LOG_OUT_STARTED = createAction('LOG_OUT_STARTED');
export const LOG_OUT_SUCCEEDED = createAction('LOG_OUT_SUCCEEDED');

export const SIGN_UP_FAILED = createAction('SIGN_UP_FAILED');
export const SIGN_UP_STARTED = createAction('SIGN_UP_STARTED');
export const SIGN_UP_SUCCEEDED = createAction(
  'SIGN_UP_SUCCEEDED',
  userData => ({
    payload: userData,
  })
);

export const logIn =
  (userData: { email: string }) => async (dispatch: Dispatch) => {
    dispatch(LOG_IN_STARTED());

    //TO-DO: Try logging in

    dispatch(LOG_IN_SUCCEEDED(userData));

    //dispatch(LOG_IN_FAILED);
  };

export const logOut = () => async (dispatch: Dispatch) => {
  dispatch(LOG_OUT_STARTED());

  //TO-DO: Try logging out

  dispatch(LOG_OUT_SUCCEEDED());

  //dispatch(LOG_OUT_FAILED);
};

export const signUp =
  (userData: { email: string }) => async (dispatch: Dispatch) => {
    dispatch(SIGN_UP_STARTED());

    //TO-DO: Try signing up

    dispatch(SIGN_UP_SUCCEEDED(userData));

    //dispatch(SIGN_UP_FAILED);
  };
