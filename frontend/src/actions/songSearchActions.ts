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

    //TO-DO: Connect to B.E
    try {
      await Promise.resolve();
      const searchResult = {
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
      };
      dispatch(SONG_SEARCH_SUCCEEDED(searchResult));
    } catch {
      dispatch(SONG_SEARCH_FAILED('Failed to retrieve song lyrics.'));
    }
  };
