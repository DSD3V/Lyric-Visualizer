import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

const ArtistSearchSchema = new Schema({
  artistImage: {
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

const ArtistSearch = model('artistSearch', ArtistSearchSchema);

export default ArtistSearch;
