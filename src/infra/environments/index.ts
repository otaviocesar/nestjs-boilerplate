import * as dotenv from 'dotenv';
dotenv.config();
const NODE_ENV: string = process.env.NODE_ENV || 'development';

const PORT: number = +process.env.PORT || 3000;

const MONGO_USER = process.env.MONGO_USER || 'db_mongo';
const MONGO_PASS = process.env.MONGO_PASS || '';
const MONGO_HOST = process.env.MONGO_HOST || 'cluster0.bs8ci.mongodb.net';
const MONGO_DATABASE =
  process.env.MONGO_DATABASE || 'myFirstDatabase?retryWrites=true&w=majority';
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DATABASE}`;

export { NODE_ENV, PORT, MONGO_URL };
