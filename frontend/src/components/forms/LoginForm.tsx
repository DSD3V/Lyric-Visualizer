import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useLayoutEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CLEAR_FORM, logIn, logInWithGoogle } from '../../actions/userActions';
import { GoogleButton } from './GoogleButton';
import {
  selectUserErrorMessage,
  selectUserIsLoading,
} from '../../selectors/userSelectors';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  ErrorMessage,
  GoogleButtonDiv,
  SubmitButtonDiv,
} from '../../styles/FormStyles';
import { StyledLink } from '../../styles/GlobalStyles';
import { REQUIRED_ERROR_MESSAGE } from '../../validation';

const formSchema = {
  resolver: yupResolver(
    yup.object().shape({
      email: yup.string().required(REQUIRED_ERROR_MESSAGE),
      password: yup.string().required(REQUIRED_ERROR_MESSAGE),
    })
  ),
};

export const LoginForm = () => {
  const dispatch = useAppDispatch();
  const loginErrorMessage = useAppSelector(selectUserErrorMessage);
  const isLoginLoading = useAppSelector(selectUserIsLoading);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm(formSchema);

  useLayoutEffect(() => {
    dispatch(CLEAR_FORM());
  }, [dispatch]);

  const handleLogInClicked = handleSubmit(async ({ email, password }) => {
    dispatch(logIn({ email, password }));
  });

  const handleLogInWithGoogleClicked = useCallback(() => {
    dispatch(logInWithGoogle());
  }, [dispatch]);

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className='mb-4 text-center'>Log In</h2>
          <Form noValidate onSubmit={handleLogInClicked}>
            <Form.Group className='mb-3'>
              <Form.Label>
                <b>Email</b>
              </Form.Label>
              <Form.Control
                {...register('email')}
                placeholder='Enter email'
                type='email'
              />
              <ErrorMessage>
                {errors.email && errors.email.message}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                <b>Password</b>
              </Form.Label>
              <Form.Control
                {...register('password')}
                placeholder='Enter password'
                type='password'
              />
              <ErrorMessage>
                {errors.password && errors.password.message}
              </ErrorMessage>
            </Form.Group>
            <SubmitButtonDiv>
              <Button className='mb-2' disabled={isLoginLoading} type='submit'>
                Log In
              </Button>
              {isLoginLoading && <p>Logging in...</p>}
              {!!loginErrorMessage && (
                <ErrorMessage>{loginErrorMessage}</ErrorMessage>
              )}
            </SubmitButtonDiv>
            <div className='text-center mt-3'>
              <StyledLink to='/forgot-password'>Forgot Password?</StyledLink>
            </div>
          </Form>
        </Card.Body>
        <div className='mb-3 mt-2 text-center'>
          Need an account? <StyledLink to='/signup'>Sign Up</StyledLink>
        </div>
        <GoogleButtonDiv>
          <GoogleButton onClick={handleLogInWithGoogleClicked} />
        </GoogleButtonDiv>
      </Card>
    </>
  );
};
