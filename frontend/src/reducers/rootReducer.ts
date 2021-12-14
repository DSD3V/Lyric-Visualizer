import { combineReducers } from 'redux';

import { savedSongsReducer } from './savedSongsReducer';
import { songSearchReducer } from './songSearchReducer';
import { userReducer } from './userReducer';

export const rootReducer = combineReducers({
  savedSongs: savedSongsReducer,
  songSearch: songSearchReducer,
  user: userReducer,
});
