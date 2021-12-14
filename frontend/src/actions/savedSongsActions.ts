import { createAction, Dispatch } from '@reduxjs/toolkit';

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

    //TO-DO: Delete song from B.E
    try {
      await Promise.resolve();
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

  //TO-DO: Get saved songs from B.E
  try {
    await Promise.resolve();
    const savedSongs = [
      {
        artistName: 'Artist Name 1 very long artist name',
        id: 1,
        imageUrl:
          'https://cdn.cnn.com/cnnnext/dam/assets/201002130046-02-black-hole-image-simulations-einstein-exlarge-169.jpg',
        songName: 'Song Name 1',
        wordCounts: [
          { text: 'word', value: 1 },
          { text: 'another', value: 1 },
          { text: 'test', value: 500 },
          { text: 'example', value: 20 },
          { text: 'repeat', value: 25 },
          { text: 'word 2', value: 1 },
          { text: 'anotherlongword', value: 1 },
          { text: 'anotherverylongwordanotherverylongword', value: 500 },
          { text: 'example 2', value: 5 },
          { text: 'hello', value: 100 },
        ],
      },
      {
        artistName: 'Arist Name',
        id: 2,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg',
        songName: 'This is the name of the song.',
        wordCounts: [
          { text: 'hello', value: 20 },
          { text: 'world', value: 20 },
          { text: 'universe', value: 50 },
          { text: 'space', value: 10 },
          { text: 'test', value: 4 },
        ],
      },
      {
        artistName: 'Artist Name 2 very long artist name',
        id: 3,
        imageUrl:
          'https://cdn.cnn.com/cnnnext/dam/assets/201002130046-02-black-hole-image-simulations-einstein-exlarge-169.jpg',
        songName: 'Song Name 2',
        wordCounts: [
          { text: 'word', value: 1 },
          { text: 'another', value: 1 },
          { text: 'test', value: 500 },
          { text: 'example', value: 20 },
          { text: 'repeat', value: 25 },
          { text: 'word 2', value: 1 },
          { text: 'anotherlongword', value: 1 },
          { text: 'anotherverylongwordanotherverylongword', value: 500 },
          { text: 'example 2', value: 5 },
          { text: 'hello', value: 100 },
        ],
      },
    ];
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
      id: string;
      imageUrl: string;
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

    //TO-DO: Post song to B.E
    try {
      await Promise.resolve();
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
