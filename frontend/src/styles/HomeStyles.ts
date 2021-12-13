import styled from 'styled-components';

import { NAV_HEIGHT, wordCloudColors } from './constants';
import { Container } from './GlobalStyles';

const FONT_HEIGHT_BREAKPOINTS = [465, 400];

export const getWordCloudOptions = (
  containerRef: React.RefObject<HTMLDivElement>
) => {
  const width = containerRef.current && containerRef.current.clientWidth;
  const fontSize =
    width &&
    (width > FONT_HEIGHT_BREAKPOINTS[0]
      ? 85
      : width > FONT_HEIGHT_BREAKPOINTS[1]
      ? 65
      : 50);
  return {
    colors: wordCloudColors,
    enableTooltip: false,
    fontSizes: [fontSize, fontSize] as [number, number],
    padding: 0,
    rotationAngles: [0, 0] as [number, number],
    rotations: 0,
    transitionDuration: 2000,
  };
};

export const HomeContainer = styled(Container)`
  margin-top: ${NAV_HEIGHT + 20}px;
`;

export const LoginSignupText = styled.span`
  font-size: 1.2rem;
  margin: 3% 0 2% 0;
  text-align: center;
  width: 80%;
`;

export const TitleContainer = styled(Container)`
  margin-top: 20px;
  width: 100%;
`;

export const WordCloudDiv = styled.div<{
  $containerRef: React.RefObject<HTMLDivElement>;
}>`
  height: ${({ $containerRef }) => {
    const width = $containerRef.current ? $containerRef.current.clientWidth : 0;
    const heightPx =
      width > FONT_HEIGHT_BREAKPOINTS[0]
        ? '150px'
        : width > FONT_HEIGHT_BREAKPOINTS[1]
        ? '120px'
        : '100px';
    return heightPx;
  }};
  margin-bottom: -3%;
  width: ${({ $containerRef }) => {
    const width = $containerRef.current ? $containerRef.current.clientWidth : 0;
    const widthVw =
      width > 1200
        ? '50vw'
        : width > 800
        ? '70vw'
        : width > 500
        ? '80vw'
        : '95vw';
    return widthVw;
  }};
`;
