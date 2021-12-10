import mongoose from 'mongoose';
import SongSearch from './SongSearch';

const Schema = mongoose.Schema;
const model = mongoose.model;

const SavedSongsSchema = new Schema({
  userId /*or email*/: String /*or Number*/,
  savedSongs: [SongSearch],
});

const SongSearch = model('songSearch', SongSearchSchema);

export default SongSearch;
