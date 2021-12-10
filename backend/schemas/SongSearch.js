import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const SongSearchSchema = new Schema({
  songImage: {
    type: String,
  },
  wordCounts: {
    type: Map,
    of: new Schema({
      count: Number,
      word: String,
    }),
  },
});

const SongSearch = model('songSearch', SongSearchSchema);

export default SongSearch;
