import db from "db";

import type { Request, Response } from "express";

const updateBook = (req: Request, res: Response) => {
  const bookId = Number(req.params.id);
  const { title, author, publishedYear } = req.body;

  const existingBook = db.prepare("SELECT * FROM books WHERE id = ?").get(bookId);
  if (!existingBook) return res.status(404).json({ message: "Książka nie instnieje" });

  // Build dynamic update query for partial updates
  const updates: string[] = [];
  const values: any[] = [];

  if (title !== undefined) {
    updates.push("title = ?");
    values.push(title);
  }
  if (author !== undefined) {
    updates.push("author = ?");
    values.push(author);
  }
  if (publishedYear !== undefined) {
    updates.push("publishedYear = ?");
    values.push(publishedYear);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "Nie podano pól do aktualizacji" });
  }

  values.push(bookId);

  const query = `UPDATE books SET ${updates.join(", ")} WHERE id = ?`;
  db.prepare(query).run(...values);

  const updatedBook = db.prepare("SELECT * FROM books WHERE id = ?").get(bookId);
  res.json(updatedBook);
};

export { updateBook };
