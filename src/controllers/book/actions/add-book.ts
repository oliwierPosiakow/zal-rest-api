import db from "db";

import type { Request, Response } from "express";

const addBook = (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
  const result = db
    .prepare("INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?)")
    .run(title, author, publishedYear);

  const book = db.prepare("SELECT * FROM books WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(book);
};

export { addBook };
