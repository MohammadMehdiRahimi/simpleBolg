import mysql from "mysql2/promise";
import "dotenv/config";
const { DB_HOST, DB_USER, DB_PASS, DB_DATABASE } = process.env;
const conn = await mysql.createConnection({
  host: DB_HOST,
  user: DB_USER,
  database: DB_DATABASE,
  password: DB_PASS,
});

export default conn;
