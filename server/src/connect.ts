import mysql from "mysql2/promise";
import dotenv from "dotenv";
import { Connection } from "mysql2";
dotenv.config();

const host = process.env.DB_HOST;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const database = process.env.DB_DATABASE;

export const dbConnection = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
});
