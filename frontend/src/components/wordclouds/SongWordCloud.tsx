import { useCallback, useLayoutEffect } from 'react';
import { Button } from 'react-bootstrap';

import {
  CLEAR_SUCCESS_MESSAGE,
  SAVE_SONG_FAILED,
  saveSong,
} from '../../actions/savedSongsActions';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import { Song } from '../../objects';
import {
  selectSavedSongs,
  selectSavedSongsIsLoading,
  selectSavedSongsErrorMessage,
  selectSavedSongsSuccessMessage,
} from '../../selectors/savedSongsSelectors';
import {
  selectSongSearchErrorMessage,
  selectSongSearchIsLoading,
  selectSongSearchResult,
} from '../../selectors/songSearchSelectors';
import { selectUserId } from '../../selectors/userSelectors';
import { ErrorMessage, SuccessMessage } from '../../styles/FormStyles';
import {
  SongWordCloudContainer,
  SongWordCloudDiv,
} from '../../styles/SongSearchStyles';
import { WordCloud } from './WordCloud';

export const SongWordCloud = () => {
  const dispatch = useAppDispatch();
  const savedSongs = useAppSelector(selectSavedSongs);
  const savedSongsErrorMessage = useAppSelector(selectSavedSongsErrorMessage);
  const savedSongsSuccessMessage = useAppSelector(
    selectSavedSongsSuccessMessage
  );
  const searchResult = useAppSelector(selectSongSearchResult);
  const userId = useAppSelector(selectUserId);
  const isSongSearchLoading = useAppSelector(selectSongSearchIsLoading);
  const isSavedSongsLoading = useAppSelector(selectSavedSongsIsLoading);
  const songSearchErrorMessage = useAppSelector(selectSongSearchErrorMessage);
  const songSearchResult = useAppSelector(selectSongSearchResult);

  useLayoutEffect(() => {
    if (!!savedSongsErrorMessage) {
      dispatch(CLEAR_SUCCESS_MESSAGE());
    }
  }, [dispatch, savedSongsErrorMessage]);

  const handleSaveWordCloud = useCallback(
    () =>
      dispatch(
        savedSongs?.find(
          (song: Song) =>
            song.artistName === searchResult.artistName &&
            song.songName === searchResult.songName
        )
          ? SAVE_SONG_FAILED('Song is already saved.')
          : saveSong({ searchResult, userId })
      ),
    [dispatch, savedSongs, searchResult, userId]
  );

  return (
    <SongWordCloudContainer>
      {isSongSearchLoading ? (
        <div>Generating Word Cloud...</div>
      ) : !!songSearchErrorMessage ? (
        <div>{songSearchErrorMessage}</div>
      ) : (
        !!songSearchResult.songName && (
          <SongWordCloudDiv>
            <WordCloud {...songSearchResult} />
            <Button
              disabled={isSavedSongsLoading}
              onClick={handleSaveWordCloud}
              type='submit'
            >
              Save Word Cloud
            </Button>
            {isSavedSongsLoading && (
              <div className='mt-3'>Saving song wordcloud...</div>
            )}
            {!!savedSongsErrorMessage && (
              <ErrorMessage>{savedSongsErrorMessage}</ErrorMessage>
            )}
            {!!savedSongsSuccessMessage && (
              <SuccessMessage>{savedSongsSuccessMessage}</SuccessMessage>
            )}
          </SongWordCloudDiv>
        )
      )}
    </SongWordCloudContainer>
  );
};
