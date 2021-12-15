import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

export const SongSearchSchema = new Schema({
  artistName: String,
  imageUrl: String,
  songId: String,
  songName: String,
  wordCounts: [{ text: String, value: Number }],
});

const SongSearch = model('SongSearch', SongSearchSchema);

export default SongSearch;
