import DB from "bun:sqlite";

const db = new DB("library.db");

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    publishedYear INTEGER NOT NULL
  )
`,
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  )
`,
).run();

db.prepare(
  `
  CREATE TABLE IF NOT EXISTS loans (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    bookId INTEGER NOT NULL,
    borrowedAt TEXT NOT NULL,
    dueDate TEXT NOT NULL,
    returned INTEGER DEFAULT 0,
    FOREIGN KEY(userId) REFERENCES users(id),
    FOREIGN KEY(bookId) REFERENCES books(id)
  )
`,
).run();

export default db;
