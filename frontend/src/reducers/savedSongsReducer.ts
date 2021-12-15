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
import { Song } from '../objects';

const initialState = {
  errorMessage: '',
  isDeleteLoading: false,
  isLoading: false,
  lastDeletedSongId: '',
  savedSongs: null,
  successMessage: '',
} as {
  errorMessage: string;
  isDeleteLoading: boolean;
  isLoading: boolean;
  lastDeletedSongId: string;
  savedSongs: null | Song[];
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
      state.isDeleteLoading = true;
    })

    .addCase(DELETE_SONG_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isDeleteLoading = false;
      if (!!state.lastDeletedSongId) {
        state.savedSongs =
          state.savedSongs?.filter(
            song => song.songId !== state.lastDeletedSongId
          ) || state.savedSongs;
      }
      state.lastDeletedSongId = action.payload.deletedSongId;
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
      const { savedSong, successMessage } = action.payload;
      state.errorMessage = '';
      state.isLoading = false;
      state.lastDeletedSongId =
        state.lastDeletedSongId === savedSong.songId
          ? ''
          : state.lastDeletedSongId;
      state.savedSongs = !!state.savedSongs
        ? [...state.savedSongs, savedSong]
        : [savedSong];
      state.successMessage = successMessage;
    });
});
