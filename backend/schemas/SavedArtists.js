import mongoose from 'mongoose';
import ArtistSearch from './ArtistSearch';

const Schema = mongoose.Schema;
const model = mongoose.model;

const SavedArtistsSchema = new Schema({
  userId /*or email*/: String /*or Number*/,
  savedArtists: [ArtistSearch],
});

const ArtistSearch = model('artistSearch', ArtistSearchSchema);

export default ArtistSearch;
