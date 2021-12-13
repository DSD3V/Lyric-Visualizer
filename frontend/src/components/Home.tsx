import { Navigate, Route, Routes } from 'react-router-dom';

import { FormWrapper } from './forms/FormWrapper';
import { LoginForm } from './forms/LoginForm';
import { ResetPasswordForm } from './forms/ResetPasswordForm';
import { SignupForm } from './forms/SignupForm';
import { HomeContainer, LoginSignupText } from '../styles/HomeStyles';
import { TitleWordCloud } from './TitleWordCloud';

export const Home = () => (
  <HomeContainer>
    <TitleWordCloud />
    <LoginSignupText>
      Log in or sign up to use the Lyric Visualizer.
    </LoginSignupText>
    <FormWrapper>
      <Routes>
        <Route element={<ResetPasswordForm />} path='/forgot-password' />
        <Route element={<LoginForm />} path='/login' />
        <Route element={<SignupForm />} path='/signup' />
        <Route element={<Navigate to='/login' />} path='*' />
      </Routes>
    </FormWrapper>
  </HomeContainer>
);
