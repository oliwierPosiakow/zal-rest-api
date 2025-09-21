import db from "db";

import type { Request, Response } from "express";

export const getBooks = (req: Request, res: Response) => {
  const books = db.prepare("SELECT * FROM books").all();
  res.json(books);
};

export const addBook = (req: Request, res: Response) => {
  const { title, author, publishedYear } = req.body;
  const result = db
    .prepare("INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?)")
    .run(title, author, publishedYear);

  const book = db.prepare("SELECT * FROM books WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(book);
};

export const getBookById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM books WHERE id = ?").run(id);
  res.status(204).send();
};
