import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: String,
  password: String,
  createAt: {
    type: Date,
    default: Date.now,
  },
});
