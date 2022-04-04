import * as dotenv from 'dotenv';
import { constants } from './constants';

dotenv.config();
const NODE_ENV: string = process.env.NODE_ENV || constants.node_env;

const PORT: number = +process.env.PORT || 3000;

const SECRET_JWT = process.env.SECRET_JWT || constants.secret_jwt;

const MONGO_USER = process.env.MONGO_USER || constants.mongo_user;
const MONGO_PASS = process.env.MONGO_PASS || constants.mongo_password;
const MONGO_HOST = process.env.MONGO_HOST || constants.mongo_host;
const MONGO_DATABASE = process.env.MONGO_DATABASE || constants.mongo_database;
const MONGO_URL =
  process.env.MONGO_URL ||
  `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_HOST}/${MONGO_DATABASE}`;

export { NODE_ENV, PORT, MONGO_URL, SECRET_JWT };
