import styled from 'styled-components';

import { colors } from './constants';

export const CaptchaDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 5% 0 5% 0;
`;

export const ErrorMessage = styled.p`
  color: ${colors.RED};
  font-size: 0.9rem;
  margin-top: 1%;
`;

export const SubmitButtonDiv = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const GoogleButtonDiv = styled(SubmitButtonDiv)`
  margin: 3% 0 5% 0;
`;

export const SuccessMessage = styled.p`
  color: ${colors.GREEN};
  font-size: 1.1rem;
  margin-top: 2%;
  text-align: center;
`;
