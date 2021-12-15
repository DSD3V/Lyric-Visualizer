import mongoose from 'mongoose'
import ArtistSearch from '../schemas/ArtistSearch.js'

const ArtistSearchSchema = ArtistSearch.schema
const Schema = mongoose.Schema
const model = mongoose.model

const SavedArtistsSchema = new Schema({
  userId /*or email*/: String /*or Number*/,
  savedArtists: [ArtistSearchSchema]
})

const SavedArtists = model('SavedArtists', SavedArtistsSchema)

export default SavedArtists
