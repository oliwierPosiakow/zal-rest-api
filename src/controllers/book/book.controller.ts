import type { Request, Response } from "express";

import { Book } from "@models/book.model";

let books: Book[] = [];

export const getBooks = (req: Request, res: Response) => {
  res.json(books);
};

export const addBook = (req: Request, res: Response) => {
  const { id, title, author, publishedYear } = req.body;
  const newBook = new Book(id, title, author, publishedYear);
  books.push(newBook);
  res.status(201).json(newBook);
};

export const getBookById = (req: Request, res: Response) => {
  const book = books.find((b) => b.id === Number(req.params.id));
  if (!book) return res.status(404).json({ message: "Nie znaleziono książki" });
  res.json(book);
};

export const deleteBook = (req: Request, res: Response) => {
  books = books.filter((b) => b.id !== Number(req.params.id));
  res.status(204).send();
};
