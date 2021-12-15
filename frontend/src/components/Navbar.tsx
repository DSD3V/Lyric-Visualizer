import { useCallback } from 'react';

import { logOut } from '../actions/userActions';
import { useAppDispatch, useAppSelector } from '../hooks/storeHooks';
import {
  selectUserEmail,
  selectUserIsAuthenticated,
} from '../selectors/userSelectors';
import {
  Nav,
  NavButton,
  NavButtonsContainer,
  NavButtonsDiv,
  NavTitle,
  UserEmailSpan,
} from '../styles/NavbarStyles';

export const Navbar = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector(selectUserIsAuthenticated);
  const userEmail = useAppSelector(selectUserEmail);

  const handleLogOutClicked = useCallback(() => dispatch(logOut()), [dispatch]);

  return (
    <Nav>
      <NavTitle to='/'>Lyric Visualizer</NavTitle>
      {isLoggedIn ? (
        <NavButtonsContainer>
          <UserEmailSpan>{userEmail}</UserEmailSpan>
          <NavButtonsDiv>
            <NavButton to='/account-settings'>Account</NavButton>
            <NavButton onClick={handleLogOutClicked} to='/login'>
              Log out
            </NavButton>
          </NavButtonsDiv>
        </NavButtonsContainer>
      ) : (
        <NavButtonsDiv>
          <NavButton to='/login'>Log In</NavButton>
          <NavButton to='/signup'>Sign Up</NavButton>
        </NavButtonsDiv>
      )}
    </Nav>
  );
};
