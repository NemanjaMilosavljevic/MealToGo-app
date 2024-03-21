const sql = require("better-sqlite3");
const db = sql("meals.db");

db.prepare(
  `CREATE TABLE IF NOT EXISTS meals (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  vegan INTEGER,
  fasting INTEGER,
  favorite INTEGER,
  quantity INTEGER
)`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS card (
  id INTEGER PRIMARY KEY,
  title TEXT NOT NULL,
  image TEXT NOT NULL,
  description TEXT NOT NULL,
  price INTEGER,
  category TEXT NOT NULL,
  subcategory TEXT NOT NULL,
  vegan INTEGER,
  fasting INTEGER,
  favorite INTEGER,
  quantity INTEGER
)`
).run();

db.prepare(
  `CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  role TEXT NOT NULL
)`
).run();
