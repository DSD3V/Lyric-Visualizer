import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const SongSearchSchema = new Schema({
  songImage: {
    type: String,
  },
  wordCounts: [{ text: String, values: Number}]

});

const SongSearch = model('SongSearch', SongSearchSchema);

export default SongSearch;
