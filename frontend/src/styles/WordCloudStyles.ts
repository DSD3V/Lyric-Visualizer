import styled from 'styled-components';
import { wordCloudColors } from './constants';

const fontSizes = [30, 80];
const rotationAngles = [0, 0];

export const wordCloudOptions = {
  colors: wordCloudColors,
  enableOptimizations: true,
  enableTooltip: false,
  fontSizes: fontSizes as [number, number],
  padding: 20,
  rotationAngles: rotationAngles as [number, number],
  rotations: 0,
  transitionDuration: 1000,
};

export const GeneratingWordCloudText = styled.span`
  position: absolute;
`;

export const WordCloudContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 3%;
  width: 100%;
`;

export const WordCloudDiv = styled.div`
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
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
