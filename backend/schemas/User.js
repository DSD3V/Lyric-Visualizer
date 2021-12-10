import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const model = mongoose.model;

// Might not need this if we use Firebase

const UserSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = model('user', UserSchema);

export default User;
