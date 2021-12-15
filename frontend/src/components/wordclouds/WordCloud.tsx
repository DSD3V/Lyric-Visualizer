import { useCallback, useRef, useState } from 'react';
import ReactWordcloud from 'react-wordcloud';

import { useMutationObservable } from '../../hooks/mutationHooks';
import {
  SongArtistDiv,
  SongImage,
  SongTitle,
  SongTitleDiv,
} from '../../styles/SongSearchStyles';
import {
  GeneratingWordCloudText,
  WordCloudContainer,
  WordCloudDiv,
  wordCloudOptions,
  WordCloudTitle,
} from '../../styles/WordCloudStyles';

export const WordCloud = ({
  artistName,
  imageUrl,
  songName,
  wordCounts,
}: {
  artistName: string;
  imageUrl: string;
  songName: string;
  wordCounts: {
    text: string;
    value: number;
  }[];
}) => {
  const wordCloudRef = useRef<HTMLDivElement>(null);
  const [isWordCloudDoneBeingGenerated, setIsWordCloudDoneBeingGenerated] =
    useState(false);

  const canvas = document.createElement('canvas');
  const canvasAllowed = !!canvas
    ? canvas
        .getContext('2d')
        ?.getImageData(0, 0, 1, 1)
        .data.every(v => v === 0)
    : false;

  const handleWordCloudMutation = useCallback(
    mutation => {
      if (isWordCloudDoneBeingGenerated) {
        return;
      }

      if (mutation[0].target.tagName === 'text') {
        setIsWordCloudDoneBeingGenerated(true);
      }
    },
    [isWordCloudDoneBeingGenerated]
  );

  useMutationObservable(wordCloudRef.current, handleWordCloudMutation);

  return (
    <WordCloudContainer>
      <WordCloudTitle>
        <SongTitleDiv>
          <SongTitle>{songName}</SongTitle>
          <SongArtistDiv>{artistName}</SongArtistDiv>
        </SongTitleDiv>
        <SongImage src={imageUrl} />
      </WordCloudTitle>
      <WordCloudDiv ref={wordCloudRef}>
        {!isWordCloudDoneBeingGenerated && (
          <GeneratingWordCloudText>
            Generating WordCloud...
          </GeneratingWordCloudText>
        )}
        {canvasAllowed ? (
          <ReactWordcloud options={wordCloudOptions} words={wordCounts} />
        ) : (
          <p>
            React wordcloud requires access to canvas image data. Please allow
            access in your browser and reload the page.
          </p>
        )}
      </WordCloudDiv>
    </WordCloudContainer>
  );
};
