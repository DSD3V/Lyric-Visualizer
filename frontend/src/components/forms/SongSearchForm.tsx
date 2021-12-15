import { useLayoutEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { CLEAR_MESSAGES } from '../../actions/savedSongsActions';
import { getSongSearchResult } from '../../actions/songSearchActions';
import { useAppDispatch, useAppSelector } from '../../hooks/storeHooks';
import {
  selectSongSearchErrorMessage,
  selectSongSearchIsLoading,
} from '../../selectors/songSearchSelectors';
import { ErrorMessage, SubmitButtonDiv } from '../../styles/FormStyles';
import { SearchInputsDiv } from '../../styles/SongSearchStyles';
import { REQUIRED_ERROR_MESSAGE } from '../../validation';

export const SongSearchForm = () => {
  const dispatch = useAppDispatch();
  const isSongSearchLoading = useAppSelector(selectSongSearchIsLoading);
  const songSearchErrorMessage = useAppSelector(selectSongSearchErrorMessage);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm();

  useLayoutEffect(() => {
    if (!isSongSearchLoading && !songSearchErrorMessage) {
      dispatch(CLEAR_MESSAGES());
    }
  }, [dispatch, isSongSearchLoading, reset, songSearchErrorMessage]);

  const handleGenerateWordCloudClicked = handleSubmit(
    async ({ artist, song }) => {
      if (!artist || !song) {
        return;
      }
      dispatch(getSongSearchResult({ artist, song }));
    }
  );

  return (
    <Card>
      <Card.Body>
        <h2 className='mb-3 text-center'>
          Generate a Word Cloud of Song Lyrics
        </h2>
        <Form noValidate onSubmit={handleGenerateWordCloudClicked}>
          <SearchInputsDiv>
            <Form.Group className='mb-3 mx-2 text-center'>
              <Form.Label>
                <b>Artist</b>
              </Form.Label>
              <Form.Control
                {...register('artist', {
                  maxLength: {
                    message: 'Artist name must be between 2 and 75 characters.',
                    value: 75,
                  },
                  minLength: {
                    message: 'Artist name must be between 2 and 75 characters.',
                    value: 2,
                  },
                  required: {
                    message: REQUIRED_ERROR_MESSAGE,
                    value: true,
                  },
                })}
                placeholder='Enter artist name'
              />
              <ErrorMessage>
                {errors.artist && errors.artist.message}
              </ErrorMessage>
            </Form.Group>
            <Form.Group className='mb-3 mx-2 text-center'>
              <Form.Label>
                <b>Song</b>
              </Form.Label>
              <Form.Control
                {...register('song', {
                  maxLength: {
                    message: 'Song name must be between 2 and 125 characters.',
                    value: 125,
                  },
                  minLength: {
                    message: 'Song name must be between 2 and 125 characters.',
                    value: 2,
                  },
                  required: {
                    message: REQUIRED_ERROR_MESSAGE,
                    value: true,
                  },
                })}
                placeholder='Enter song name'
              />
              <ErrorMessage>{errors.song && errors.song.message}</ErrorMessage>
            </Form.Group>
          </SearchInputsDiv>
          <SubmitButtonDiv>
            <Button disabled={isSongSearchLoading} type='submit'>
              Generate Word Cloud
            </Button>
          </SubmitButtonDiv>
        </Form>
      </Card.Body>
    </Card>
  );
};
