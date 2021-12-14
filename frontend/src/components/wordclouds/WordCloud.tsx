import ReactWordcloud from 'react-wordcloud';

import {
  SongArtistDiv,
  SongImage,
  SongTitle,
  SongTitleDiv,
} from '../../styles/SongSearchStyles';
import {
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
}) => (
  <WordCloudContainer>
    <WordCloudTitle>
      <SongTitleDiv>
        <SongTitle>{songName}</SongTitle>
        <SongArtistDiv>{artistName}</SongArtistDiv>
      </SongTitleDiv>
      <SongImage src={imageUrl} />
    </WordCloudTitle>
    <WordCloudDiv>
      <ReactWordcloud options={wordCloudOptions} words={wordCounts} />
    </WordCloudDiv>
  </WordCloudContainer>
);
