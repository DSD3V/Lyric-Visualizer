import styled from 'styled-components';
import { wordCloudColors } from './constants';

export const wordCloudOptions = {
  colors: wordCloudColors,
  enableTooltip: false,
  fontSizes: [30, 80] as [number, number],
  padding: 20,
  rotationAngles: [0, 0] as [number, number],
  rotations: 0,
  transitionDuration: 2000,
};

export const WordCloudContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3%;
  width: 100%;
`;

export const WordCloudDiv = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  margin-top: 2%;
  min-height: 500px;
  padding: 1%;
  width: 80%;

  @media (max-width: 800px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const WordCloudTitle = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  width: 100%;
`;
