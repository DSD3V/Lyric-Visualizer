import { createReducer } from '@reduxjs/toolkit';

import {
  SONG_SEARCH_FAILED,
  SONG_SEARCH_STARTED,
  SONG_SEARCH_SUCCEEDED,
} from '../actions/songSearchActions';

const initialState = {
  errorMessage: '',
  isLoading: false,
  searchResult: {
    artistName: '',
    id: '',
    imageUrl: '',
    songName: '',
    wordCounts: [],
  },
} as {
  errorMessage: string;
  isLoading: boolean;
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
};

export const songSearchReducer = createReducer(initialState, builder => {
  builder
    .addCase(SONG_SEARCH_FAILED, (state, action) => {
      state.errorMessage = action.payload.errorMessage;
      state.isLoading = false;
    })

    .addCase(SONG_SEARCH_STARTED, state => {
      state.errorMessage = '';
      state.isLoading = true;
    })

    .addCase(SONG_SEARCH_SUCCEEDED, (state, action) => {
      state.errorMessage = '';
      state.isLoading = false;
      state.searchResult = action.payload.searchResult;
    });
});
