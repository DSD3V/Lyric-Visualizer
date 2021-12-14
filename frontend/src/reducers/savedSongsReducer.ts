import { createReducer } from '@reduxjs/toolkit';

import {
  CLEAR_MESSAGES,
  CLEAR_SUCCESS_MESSAGE,
  DELETE_SONG_FAILED,
  DELETE_SONG_STARTED,
  DELETE_SONG_SUCCEEDED,
  GET_SAVED_SONGS_FAILED,
  GET_SAVED_SONGS_STARTED,
  GET_SAVED_SONGS_SUCCEEDED,
  SAVE_SONG_FAILED,
  SAVE_SONG_STARTED,
  SAVE_SONG_SUCCEEDED,
} from '../actions/savedSongsActions';

interface Song {
  artistName: string;
  id: string;
  imageUrl: string;
  songName: string;
  wordCounts: {
    text: '';
    value: 0;
  }[];
}

const initialState = {
  errorMessage: '',
  isLoading: false,
  savedSongs: [],
  successMessage: '',
} as {
  errorMessage: string;
  isLoading: boolean;
  savedSongs: Song[];
  successMessage: string;
};

export const savedSongsReducer = createReducer(initialState, builder => {
  builder
    .addCase(CLEAR_MESSAGES, state => {
      state.errorMessage = '';
      state.successMessage = '';
    })

    .addCase(CLEAR_SUCCESS_MESSAGE, state => {
      state.successMessage = '';
    })

    .addCase(DELETE_SONG_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(DELETE_SONG_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(DELETE_SONG_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.savedSongs = state.savedSongs.filter(
        song => song.id !== action.payload.deletedSongId
      );
      state.successMessage = action.payload.successMessage;
    })

    .addCase(GET_SAVED_SONGS_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(GET_SAVED_SONGS_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(GET_SAVED_SONGS_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.savedSongs = action.payload.savedSongs;
    })

    .addCase(SAVE_SONG_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(SAVE_SONG_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(SAVE_SONG_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.savedSongs = [...state.savedSongs, action.payload.savedSong];
      state.successMessage = action.payload.successMessage;
    });
});
