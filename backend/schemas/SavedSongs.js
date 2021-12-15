import mongoose from 'mongoose';

import { SongSearchSchema } from './SongSearch.js';

const Schema = mongoose.Schema;
const model = mongoose.model;

const SavedSongsSchema = new Schema({
  userId: String,
  savedSongs: [SongSearchSchema],
});

const SavedSongs = model('savedSongs', SavedSongsSchema);

export default SavedSongs;
