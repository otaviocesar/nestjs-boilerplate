import { Document } from 'mongoose';

export interface UserEntity extends Document {
  name: string;
  email: string;
  password: string;
  createAt: string;
}
