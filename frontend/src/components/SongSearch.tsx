import { yupResolver } from '@hookform/resolvers/yup';
import { useLayoutEffect } from 'react';
import { Button, Card, Form } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { getSongSearchResult } from '../actions/songSearchActions';
import {
  selectSongSearchErrorMessage,
  selectSongSearchIsLoading,
} from '../selectors/songSearchSelectors';
import { useAppDispatch, useAppSelector } from '../store';
import { ErrorMessage, SubmitButtonDiv } from '../styles/FormStyles';
import { Container } from '../styles/GlobalStyles';
import { SearchInputsDiv } from '../styles/SongSearchStyles';
import { REQUIRED_ERROR_MESSAGE } from '../validation';

const formSchema = {
  resolver: yupResolver(
    yup.object().shape({
      artist: yup.string().required(REQUIRED_ERROR_MESSAGE),
      song: yup.string().required(REQUIRED_ERROR_MESSAGE),
    })
  ),
};

export const SongSearch = () => {
  const dispatch = useAppDispatch();
  const songSearchErrorMessage = useAppSelector(selectSongSearchErrorMessage);
  const isSongSearchLoading = useAppSelector(selectSongSearchIsLoading);
  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm(formSchema);

  useLayoutEffect(() => {
    if (!isSongSearchLoading && !songSearchErrorMessage) {
      reset();
    }
  }, [isSongSearchLoading, reset, songSearchErrorMessage]);

  const handleGenerateWordCloudClicked = handleSubmit(
    async ({ artist, song }) => {
      dispatch(getSongSearchResult({ artist, song }));
    }
  );

  return (
    <Container>
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
                  {...register('artist')}
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
                  {...register('song')}
                  placeholder='Enter song name'
                />
                <ErrorMessage>
                  {errors.song && errors.song.message}
                </ErrorMessage>
              </Form.Group>
            </SearchInputsDiv>
            <SubmitButtonDiv>
              <Button disabled={isSongSearchLoading} type='submit'>
                Generate Word Cloud
              </Button>
            </SubmitButtonDiv>
            {isSongSearchLoading && <p>Getting song lyrics...</p>}
            {!!songSearchErrorMessage && (
              <ErrorMessage>{songSearchErrorMessage}</ErrorMessage>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};
