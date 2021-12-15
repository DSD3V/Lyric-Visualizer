import { yupResolver } from '@hookform/resolvers/yup';
import { useLayoutEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { CLEAR_FORM, resetPassword } from '../../actions/userActions';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  selectUserErrorMessage,
  selectUserIsLoading,
  selectUserSuccessMessage,
} from '../../selectors/userSelectors';
import {
  ErrorMessage,
  SubmitButtonDiv,
  SuccessMessage,
} from '../../styles/FormStyles';
import { StyledLink } from '../../styles/GlobalStyles';
import { REQUIRED_ERROR_MESSAGE } from '../../validation';

const formSchema = {
  resolver: yupResolver(
    yup.object().shape({
      email: yup.string().required(REQUIRED_ERROR_MESSAGE),
    })
  ),
};

export const ResetPasswordForm = () => {
  const dispatch = useAppDispatch();
  const forgotPasswordErrorMessage = useAppSelector(selectUserErrorMessage);
  const forgotPasswordSuccessMessage = useAppSelector(selectUserSuccessMessage);
  const isForgotPasswordLoading = useAppSelector(selectUserIsLoading);
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm(formSchema);

  useLayoutEffect(() => {
    dispatch(CLEAR_FORM());
  }, [dispatch]);

  const handleResetClicked = handleSubmit(async ({ email }) => {
    dispatch(resetPassword({ email }));
  });

  return (
    <Card>
      <Card.Body>
        <h2 className='mb-4 text-center'>Password Reset</h2>
        <Form noValidate onSubmit={handleResetClicked}>
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
          <SubmitButtonDiv>
            <Button
              className='mb-2'
              disabled={isForgotPasswordLoading}
              type='submit'
            >
              Reset Password
            </Button>
            {isForgotPasswordLoading && <p>Sending reset password email...</p>}
            {!!forgotPasswordSuccessMessage && (
              <SuccessMessage>{forgotPasswordSuccessMessage}</SuccessMessage>
            )}
            {!!forgotPasswordErrorMessage && (
              <ErrorMessage>{forgotPasswordErrorMessage}</ErrorMessage>
            )}
          </SubmitButtonDiv>
          <div className='text-center mt-3'>
            <StyledLink to='/login'>Return to Log In</StyledLink>
          </div>
        </Form>
      </Card.Body>
      <div className='mb-3 mt-1 text-center'>
        Need an account? <StyledLink to='/signup'>Sign Up</StyledLink>
      </div>
    </Card>
  );
};
