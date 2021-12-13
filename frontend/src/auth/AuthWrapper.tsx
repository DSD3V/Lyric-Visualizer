import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { LOG_IN_SUCCEEDED, SIGN_UP_SUCCEEDED } from '../actions/userActions';
import { auth } from './firebase';
import { selectUserIsAuthenticated } from '../selectors/userSelectors';
import { useAppDispatch, useAppSelector } from '../store';

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAppSelector(selectUserIsAuthenticated);
  const currentRoute = useLocation().pathname;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        const wasAlreadyAuthenticated = isAuthenticated;
        dispatch(
          currentRoute === '/login'
            ? LOG_IN_SUCCEEDED({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
              })
            : SIGN_UP_SUCCEEDED({
                email: user.email,
                id: user.uid,
                token: user.refreshToken,
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
