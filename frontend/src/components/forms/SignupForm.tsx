import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useLayoutEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import ReCaptchaV2 from 'react-google-recaptcha';
import * as yup from 'yup';

import { CLEAR_FORM, logInWithGoogle, signUp } from '../../actions/userActions';
import { GoogleButton } from './GoogleButton';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  selectUserErrorMessage,
  selectUserIsLoading,
} from '../../selectors/userSelectors';
import {
  CaptchaDiv,
  ErrorMessage,
  GoogleButtonDiv,
  SubmitButtonDiv,
} from '../../styles/FormStyles';
import { StyledLink } from '../../styles/GlobalStyles';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORDS_MUST_MATCH,
  REQUIRED_ERROR_MESSAGE,
  VALID_EMAIL_FORM,
  VALID_EMAIL_REGEX,
} from '../../validation';

const formSchema = {
  resolver: yupResolver(
    yup.object().shape({
      confirmPassword: yup
        .string()
        .required(REQUIRED_ERROR_MESSAGE)
        .oneOf([yup.ref('password')], PASSWORDS_MUST_MATCH),
      email: yup
        .string()
        .required(REQUIRED_ERROR_MESSAGE)
        .matches(VALID_EMAIL_REGEX, VALID_EMAIL_FORM),
      password: yup
        .string()
        .required(REQUIRED_ERROR_MESSAGE)
        .min(6, PASSWORD_MIN_LENGTH),
      reCaptcha: yup
        .boolean()
        .oneOf([true], REQUIRED_ERROR_MESSAGE)
        .required(REQUIRED_ERROR_MESSAGE),
    })
  ),
};

export const SignupForm = () => {
  const dispatch = useAppDispatch();
  const signupErrorMessage = useAppSelector(selectUserErrorMessage);
  const isSignupLoading = useAppSelector(selectUserIsLoading);
  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm(formSchema);

  useLayoutEffect(() => {
    dispatch(CLEAR_FORM());
  }, [dispatch]);

  const handleSignUpClicked = handleSubmit(async ({ email, password }) => {
    dispatch(signUp({ email, password }));
  });

  const handleLogInWithGoogleClicked = useCallback(() => {
    dispatch(logInWithGoogle());
  }, [dispatch]);

  return (
    <Card>
      <Card.Body>
        <h2 className='mb-4 text-center'>Sign Up</h2>
        <Form noValidate onSubmit={handleSignUpClicked}>
          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Email</b>
            </Form.Label>
            <Form.Control
              {...register('email')}
              placeholder='Enter email'
              type='email'
            />
            <ErrorMessage>{errors.email && errors.email.message}</ErrorMessage>
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
          <Form.Group className='mb-3'>
            <Form.Label>
              <b>Confirm Password</b>
            </Form.Label>
            <Form.Control
              {...register('confirmPassword')}
              placeholder='Confirm pasword'
              type='password'
            />
            <ErrorMessage>
              {errors.confirmPassword && errors.confirmPassword.message}
            </ErrorMessage>
          </Form.Group>
          <CaptchaDiv>
            <ReCaptchaV2
              onChange={() => setValue('reCaptcha', true)}
              onExpired={() => setValue('reCaptcha', false)}
              sitekey={process.env.REACT_APP_CAPTCHA_SITE_KEY || ''}
            />
            <ErrorMessage>
              {errors.reCaptcha && errors.reCaptcha.message}
            </ErrorMessage>
          </CaptchaDiv>
          <SubmitButtonDiv>
            <Button className='mb-2' disabled={isSignupLoading} type='submit'>
              Sign Up
            </Button>
            {isSignupLoading && <p>Signing up...</p>}
            {!!signupErrorMessage && (
              <ErrorMessage>{signupErrorMessage}</ErrorMessage>
            )}
          </SubmitButtonDiv>
        </Form>
      </Card.Body>
      <div className='mb-3 mt-2 text-center'>
        Already have an account? <StyledLink to='/login'>Log In</StyledLink>
      </div>
      <GoogleButtonDiv>
        <GoogleButton onClick={handleLogInWithGoogleClicked} />
      </GoogleButtonDiv>
    </Card>
  );
};
