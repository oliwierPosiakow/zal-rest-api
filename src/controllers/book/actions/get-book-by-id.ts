import db from "db";

import type { Request, Response } from "express";

const getBookById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const book = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
  if (!book) return res.status(404).json({ message: "Książka nie znaleziona" });
  res.json(book);
};

export { getBookById };
