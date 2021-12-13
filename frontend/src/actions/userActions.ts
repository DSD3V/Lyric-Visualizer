import { createAction, Dispatch } from '@reduxjs/toolkit'
import { auth, getProfile } from '../firebase/config'

export const LOG_IN_FAILED = createAction('LOG_IN_FAILED')
export const LOG_IN_STARTED = createAction('LOG_IN_STARTED')
export const LOG_IN_SUCCEEDED = createAction(
  'LOG_IN_SUCCEEDED',
  (userData) => ({
    payload: userData
  })
)

export const LOG_OUT_FAILED = createAction('LOG_OUT_FAILED')
export const LOG_OUT_STARTED = createAction('LOG_OUT_STARTED')
export const LOG_OUT_SUCCEEDED = createAction('LOG_OUT_SUCCEEDED')

export const SIGN_UP_FAILED = createAction('SIGN_UP_FAILED')
export const SIGN_UP_STARTED = createAction('SIGN_UP_STARTED')
export const SIGN_UP_SUCCEEDED = createAction(
  'SIGN_UP_SUCCEEDED',
  (userData) => ({
    payload: userData
  })
)

export const logIn =
  (userData: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(LOG_IN_STARTED())

    try {
      await auth.signInWithEmailAndPassword(userData.email, userData.password)
      console.log(getProfile())
      dispatch(LOG_IN_SUCCEEDED(userData))
    } catch (err) {
      console.log(err)
      dispatch(LOG_IN_FAILED)
    }
  }

export const logOut = () => async (dispatch: Dispatch) => {
  dispatch(LOG_OUT_STARTED())

  //TO-DO: Try logging out

  try {
    await auth.signOut()
    dispatch(LOG_OUT_SUCCEEDED())
  } catch (err) {
    console.log(err)
    dispatch(LOG_OUT_FAILED)
  }
}

export const signUp =
  (userData: { email: string; password: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(SIGN_UP_STARTED())

    try {
      await auth.createUserWithEmailAndPassword(
        userData.email,
        userData.password
      )
      dispatch(SIGN_UP_SUCCEEDED(userData))
    } catch (err) {
      console.log(err)
      dispatch(SIGN_UP_FAILED)
    }
  }
