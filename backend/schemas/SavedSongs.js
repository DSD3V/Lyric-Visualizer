import mongoose from 'mongoose';
//import SongSearch from './SongSearch';
import SongSearch from '../schemas/SongSearch.js';


const Schema = mongoose.Schema;
const model = mongoose.model;

const SavedSongsSchema = new Schema({
  userId /*or email*/: String /*or Number*/,
  savedSongs: [SongSearch], 
});

const SavedSongs = model('SavedSongs', SavedSongsSchema);

export default SavedSongs;
