import db from "db";

import type { Request, Response } from "express";

const getBooks = (req: Request, res: Response) => {
  const books = db.prepare("SELECT * FROM books").all();
  res.json(books);
};

export { getBooks };
