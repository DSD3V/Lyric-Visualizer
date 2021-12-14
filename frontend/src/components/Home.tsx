import { Navigate, Route, Routes } from 'react-router-dom';

import { FormWrapper } from './forms/FormWrapper';
import { LoginForm } from './forms/LoginForm';
import { ResetPasswordForm } from './forms/ResetPasswordForm';
import { SignupForm } from './forms/SignupForm';
import { HomeContainer, LoginSignupText } from '../styles/HomeStyles';
import { TitleWordCloud } from './wordclouds/TitleWordCloud';

export const Home = () => (
  <HomeContainer>
    <TitleWordCloud />
    <LoginSignupText>
      Log in or sign up to use the Lyric Visualizer.
    </LoginSignupText>
    <FormWrapper>
      <Routes>
        <Route path='/login' element={<LoginForm />} />
        <Route path='/signup' element={<SignupForm />} />
        <Route path='/forgot-password' element={<ResetPasswordForm />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </FormWrapper>
  </HomeContainer>
);
