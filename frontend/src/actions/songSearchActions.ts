import { createAction, Dispatch } from '@reduxjs/toolkit';

export const SONG_SEARCH_FAILED = createAction(
  'SONG_SEARCH_FAILED',
  errorMessage => ({
    payload: errorMessage,
  })
);
export const SONG_SEARCH_STARTED = createAction('SONG_SEARCH_STARTED');
export const SONG_SEARCH_SUCCEEDED = createAction(
  'SONG_SEARCH_SUCCEEDED',
  searchResult => ({
    payload: { searchResult },
  })
);

export const getSongSearchResult =
  ({ artist, song }: { artist: string; song: string }) =>
  async (dispatch: Dispatch) => {
    dispatch(SONG_SEARCH_STARTED());

    //TO-DO: Get search result from B.E
    try {
      await Promise.resolve();
      const searchResult = {
        artistName: 'Artist Name 1',
        id: 123,
        imageUrl:
          'https://upload.wikimedia.org/wikipedia/commons/4/4f/Black_hole_-_Messier_87_crop_max_res.jpg',
        songName: 'Song Name New',
        wordCounts: [
          { text: 'hello', value: 20 },
          { text: 'world', value: 20 },
          { text: 'universe', value: 50 },
          { text: 'space', value: 10 },
          { text: 'test', value: 4 },
          { text: 'word', value: 1 },
          { text: 'another', value: 1 },
          { text: 'test', value: 500 },
          { text: 'example', value: 20 },
          { text: 'repeat', value: 25 },
          { text: 'word 2', value: 1 },
          { text: 'anotherlongword', value: 1 },
          { text: 'anotherverylongword', value: 20 },
          { text: 'example 2', value: 5 },
          { text: 'hello', value: 100 },
        ],
      };
      dispatch(SONG_SEARCH_SUCCEEDED(searchResult));
    } catch {
      dispatch(SONG_SEARCH_FAILED('Failed to retrieve song lyrics.'));
    }
  };
