import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LOG_IN_SUCCEEDED, SIGN_UP_SUCCEEDED } from '../actions/userActions';
import { auth } from './firebase';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import { selectUserIsAuthenticated } from '../selectors/userSelectors';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);
  const currentRoute = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const wasAlreadyAuthenticated = isAuthenticated;
        const {
          email,
          metadata: { creationTime, lastSignInTime },
          refreshToken,
          uid: userId,
        } = user;

        dispatch(
          creationTime === lastSignInTime
            ? SIGN_UP_SUCCEEDED({
                email,
                userId,
                token: refreshToken,
              })
            : LOG_IN_SUCCEEDED({
                email,
                userId,
                token: refreshToken,
              })
        );

        if (!wasAlreadyAuthenticated) {
          navigate('/');
        }
      }
    });
    return unsubscribe;
  }, [currentRoute, dispatch, isAuthenticated, navigate]);

  return <>{children}</>;
};
