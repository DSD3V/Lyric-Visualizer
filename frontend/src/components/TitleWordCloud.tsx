import throttle from 'lodash.throttle';
import ReactWordcloud from 'react-wordcloud';
import { useCallback, useEffect, useRef, useState } from 'react';

import { TitleContainer } from '../styles/HomeStyles';
import { getWordCloudOptions, WordCloudDiv } from '../styles/HomeStyles';

export const TitleWordCloud = () => {
  const containerRef = useRef(null);
  const isMounted = useRef(false);
  const [wordCloudOptions, setWordCloudOptions] = useState({});

  const handleMouseMove = throttle(
    useCallback(() => {
      if (isMounted.current) {
        setWordCloudOptions(getWordCloudOptions(containerRef));
      }
    }, []),
    3000
  );

  const handleResize = useCallback(() => {
    if (isMounted.current) {
      setWordCloudOptions(getWordCloudOptions(containerRef));
    }
  }, []);

  const handleScroll = throttle(
    useCallback(() => {
      if (isMounted.current) {
        setWordCloudOptions(getWordCloudOptions(containerRef));
      }
    }, []),
    3000
  );

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove, handleResize, handleScroll]);

  useEffect(() => {
    if (containerRef) {
      setWordCloudOptions(getWordCloudOptions(containerRef));
    }
  }, [containerRef]);

  const containerRefCallback = useCallback(ref => {
    containerRef.current = ref;
  }, []);

  return (
    <TitleContainer ref={containerRefCallback}>
      <WordCloudDiv $containerRef={containerRef}>
        <ReactWordcloud
          options={wordCloudOptions}
          words={[
            {
              text: 'Lyric',
              value: 1,
            },
          ]}
        />
      </WordCloudDiv>
      <WordCloudDiv $containerRef={containerRef}>
        <ReactWordcloud
          options={wordCloudOptions}
          words={[
            {
              text: 'Visualizer',
              value: 1,
            },
          ]}
        />
      </WordCloudDiv>
    </TitleContainer>
  );
};
