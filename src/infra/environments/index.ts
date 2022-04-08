import * as dotenv from 'dotenv';

dotenv.config();
const NODE_ENV: string = process.env.NODE_ENV;

const PORT: number = +process.env.SERVER_PORT || 3000;

const SECRET_JWT = process.env.SECRET_JWT;

const MONGO_USER = process.env.DATABASE_USERNAME;
const MONGO_PASS = process.env.DATABASE_PASSWORD;
const MONGO_HOST = process.env.DATABASE_HOST;
const MONGO_DATABASE = process.env.DATABASE_NAME;
const MONGO_PORT = process.env.DATABASE_PORT;
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;

export { NODE_ENV, PORT, MONGO_URL, SECRET_JWT };
