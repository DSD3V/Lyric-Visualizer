import { createAction, Dispatch } from '@reduxjs/toolkit';

export const GET_SAVED_SONGS_FAILED = createAction(
  'GET_SAVED_SONGS_FAILED',
  errorMessage => ({
    payload: errorMessage,
  })
);
export const GET_SAVED_SONGS_STARTED = createAction('GET_SAVED_SONGS_STARTED');
export const GET_SAVED_SONGS_SUCCEEDED = createAction(
  'GET_SAVED_SONGS_SUCCEEDED',
  savedSongs => ({
    payload: { savedSongs },
  })
);

export const getSavedSongs = (userId: string) => async (dispatch: Dispatch) => {
  dispatch(GET_SAVED_SONGS_STARTED());

  //TO-DO: Connect to B.E
  try {
    await Promise.resolve();
    const savedSongs = [
      {
        artistName: 'Artist Name 1',
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg',
        songName: 'Song Name 1',
        wordCounts: [
          { text: 'hello', value: 20 },
          { text: 'world', value: 20 },
          { text: 'universe', value: 50 },
          { text: 'space', value: 10 },
          { text: 'test', value: 4 },
        ],
      },
      {
        artistName: 'Artist Name 2',
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
