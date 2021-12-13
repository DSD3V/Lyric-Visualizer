import { yupResolver } from '@hookform/resolvers/yup';
import { useLayoutEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup';

import { CLEAR_FORM, updateAccountSettings } from '../../actions/userActions';
import { FormWrapper } from './FormWrapper';
import {
  selectUserErrorMessage,
  selectUserIsLoading,
  selectUserSuccessMessage,
} from '../../selectors/userSelectors';
import { useAppDispatch, useAppSelector } from '../../store';
import {
  ErrorMessage,
  SubmitButtonDiv,
  SuccessMessage,
} from '../../styles/FormStyles';
import { StyledLink } from '../../styles/GlobalStyles';
import {
  PASSWORD_MIN_LENGTH,
  PASSWORDS_MUST_MATCH,
  VALID_EMAIL_FORM,
  VALID_EMAIL_REGEX,
} from '../../validation';

const formSchema = {
  resolver: yupResolver(
    yup.object().shape({
      confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], PASSWORDS_MUST_MATCH),
      email: yup.string().when('hasEmail', {
        is: true,
        then: yup.string().matches(VALID_EMAIL_REGEX, VALID_EMAIL_FORM),
      }),
      hasEmail: yup.boolean(),
      hasPassword: yup.boolean(),
      password: yup.string().when('hasPassword', {
        is: true,
        then: yup.string().min(6, PASSWORD_MIN_LENGTH),
      }),
    })
  ),
};

export const AccountSettingsForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const changeAccountSettingsErrorMessage = useAppSelector(
    selectUserErrorMessage
  );
  const changeAccountSettingsSuccessMessage = useAppSelector(
    selectUserSuccessMessage
  );
  const isChangeAccountSettingsLoading = useAppSelector(selectUserIsLoading);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
    setValue,
  } = useForm(formSchema);

  useLayoutEffect(() => {
    dispatch(CLEAR_FORM());
  }, [dispatch]);

  useLayoutEffect(() => {
    if (!isChangeAccountSettingsLoading && !changeAccountSettingsErrorMessage) {
      reset();
    }
  }, [
    changeAccountSettingsErrorMessage,
    isChangeAccountSettingsLoading,
    reset,
  ]);

  const handleSaveChangesClicked = handleSubmit(async ({ email, password }) => {
    if (!email && !password) {
      return;
    }
    dispatch(updateAccountSettings({ email, password }));
  });

  return (
    <FormWrapper>
      <Card>
        <Card.Body>
          <h2 className='mb-4 text-center'>Update Account</h2>
          <Form noValidate onSubmit={handleSaveChangesClicked}>
            <Form.Group className='mb-3'>
              <Form.Label>
                <b>New Email</b>
              </Form.Label>
              <Form.Control
                {...register('email')}
                onChange={({ target: { value } }) =>
                  setValue('hasEmail', !!value.length)
                }
                placeholder='Enter new email (optional)'
                type='email'
              />
              <ErrorMessage>
                {errors.email && errors.email.message}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                <b>New Password</b>
              </Form.Label>
              <Form.Control
                {...register('password')}
                onChange={({ target: { value } }) =>
                  setValue('hasPassword', !!value.length)
                }
                placeholder='Enter new password (optional)'
                type='password'
              />
              <ErrorMessage>
                {errors.password && errors.password.message}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className='mb-3'>
              <Form.Label>
                <b>Confirm New Password</b>
              </Form.Label>
              <Form.Control
                {...register('confirmPassword')}
                placeholder='Confirm new pasword'
                type='password'
              />
              <ErrorMessage>
                {errors.confirmPassword && errors.confirmPassword.message}
              </ErrorMessage>
            </Form.Group>
            <SubmitButtonDiv>
              <Button
                className='mb-2'
                disabled={isChangeAccountSettingsLoading}
                type='submit'
              >
                Save Changes
              </Button>
              {isChangeAccountSettingsLoading && <p>Saving changes...</p>}
              {!!changeAccountSettingsSuccessMessage && (
                <SuccessMessage>
                  {changeAccountSettingsSuccessMessage}
                </SuccessMessage>
              )}
              {!!changeAccountSettingsErrorMessage && (
                <ErrorMessage>{changeAccountSettingsErrorMessage}</ErrorMessage>
              )}
            </SubmitButtonDiv>
          </Form>
        </Card.Body>
        <div className='mb-3 mt-2 text-center'>
          <StyledLink onClick={() => navigate(-1)} to='/'>
            Return to Application
          </StyledLink>
        </div>
      </Card>
    </FormWrapper>
  );
};
