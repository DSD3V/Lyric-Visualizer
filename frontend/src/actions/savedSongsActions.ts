import { createAction, Dispatch } from '@reduxjs/toolkit';
import axios from 'axios';

export const CLEAR_MESSAGES = createAction('CLEAR_MESSAGES');
export const CLEAR_SUCCESS_MESSAGE = createAction('CLEAR_SUCCESS_MESSAGE');

export const DELETE_SONG_FAILED = createAction(
  'DELETE_SONG_FAILED',
  errorMessage => ({
    payload: { errorMessage },
  })
);
export const DELETE_SONG_STARTED = createAction('DELETE_SONG_STARTED');
export const DELETE_SONG_SUCCEEDED = createAction(
  'DELETE_SONG_SUCCEEDED',
  ({ deletedSongId, successMessage }) => ({
    payload: { deletedSongId, successMessage },
  })
);

export const GET_SAVED_SONGS_FAILED = createAction(
  'GET_SAVED_SONGS_FAILED',
  errorMessage => ({
    payload: { errorMessage },
  })
);
export const GET_SAVED_SONGS_STARTED = createAction('GET_SAVED_SONGS_STARTED');
export const GET_SAVED_SONGS_SUCCEEDED = createAction(
  'GET_SAVED_SONGS_SUCCEEDED',
  savedSongs => ({
    payload: { savedSongs },
  })
);

export const SAVE_SONG_FAILED = createAction(
  'SAVE_SONG_FAILED',
  errorMessage => ({
    payload: { errorMessage },
  })
);
export const SAVE_SONG_STARTED = createAction('SAVE_SONG_STARTED');
export const SAVE_SONG_SUCCEEDED = createAction(
  'SAVE_SONG_SUCCEEDED',
  ({ savedSong, successMessage }) => ({
    payload: { savedSong, successMessage },
  })
);

export const deleteSong =
  ({
    deleteSuccessCallback,
    songId,
    userId,
  }: {
    deleteSuccessCallback: () => void;
    songId: string;
    userId: string;
  }) =>
  async (dispatch: Dispatch) => {
    dispatch(DELETE_SONG_STARTED());

    try {
      await axios.delete('/savedSongs', { params: { songId, userId } });
      dispatch(
        DELETE_SONG_SUCCEEDED({
          deletedSongId: songId,
          successMessage: 'Deleted song from saved wordclouds.',
        })
      );
      deleteSuccessCallback();
    } catch {
      dispatch(
        DELETE_SONG_FAILED('Failed to delete song from saved wordclouds.')
      );
    }
  };

export const getSavedSongs = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(GET_SAVED_SONGS_STARTED());

  try {
    const {
      data: { data: savedSongs },
    } = await axios.get('/savedSongs', { params: { userId } });
    dispatch(GET_SAVED_SONGS_SUCCEEDED(savedSongs));
  } catch {
    dispatch(GET_SAVED_SONGS_FAILED('Failed to retrieve saved songs.'));
  }
};

export const saveSong =
  ({
    searchResult,
    userId,
  }: {
    searchResult: {
      artistName: string;
      imageUrl: string;
      songId: string;
      songName: string;
      wordCounts: {
        text: string;
        value: number;
      }[];
    };
    userId: string;
  }) =>
  async (dispatch: Dispatch) => {
    dispatch(SAVE_SONG_STARTED());

    try {
      await axios.post('/savedSongs', searchResult, {
        params: { userId },
      });
      dispatch(
        SAVE_SONG_SUCCEEDED({
          savedSong: searchResult,
          successMessage: 'Saved song wordcloud.',
        })
      );
    } catch {
      dispatch(SAVE_SONG_FAILED('Failed to save song wordcloud.'));
    }
  };
