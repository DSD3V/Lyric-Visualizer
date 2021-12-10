import { combineReducers } from 'redux';

import { artistSearchReducer } from './artistSearchReducer';
import { savedArtistsReducer } from './savedArtistsReducer';
import { savedSongsReducer } from './savedSongsReducer';
import { songSearchReducer } from './songSearchReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  artistSearch: artistSearchReducer,
  savedArtists: savedArtistsReducer,
  savedSongs: savedSongsReducer,
  songSearch: songSearchReducer,
  user: userReducer,
});
