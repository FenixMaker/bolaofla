import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

async function connectDB() {
  const db = await open({
    filename: './backend/database.db',
    driver: sqlite3.Database
  });
  return db;
}

export default connectDB;
