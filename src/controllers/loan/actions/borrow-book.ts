import type { LoanRow } from "@models/loan.model";
import db from "db";

import type { Request, Response } from "express";

const borrowBook = (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
  if (!user) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

  const book = db.prepare("SELECT * FROM books WHERE id = ?").get(bookId);
  if (!book) return res.status(404).json({ message: "Nie znaleziono książki" });

  const alreadyLoaned = db
    .prepare("SELECT * FROM loans WHERE bookId = ? AND returned = 0")
    .get(bookId);
  if (alreadyLoaned) return res.status(400).json({ message: "Książka już wypożyczona" });

  const borrowedAt = new Date().toISOString();
  const dueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

  const result = db
    .prepare("INSERT INTO loans (userId, bookId, borrowedAt, dueDate) VALUES (?, ?, ?, ?)")
    .run(userId, bookId, borrowedAt, dueDate);

  const loan = db
    .prepare(
      `SELECT l.id, l.borrowedAt, l.dueDate, l.returned,
              u.id as userId, u.name as userName, u.email as userEmail,
              b.id as bookId, b.title as bookTitle, b.author as bookAuthor, b.publishedYear
       FROM loans l
       JOIN users u ON l.userId = u.id
       JOIN books b ON l.bookId = b.id
       WHERE l.id = ?`,
    )
    .get(result.lastInsertRowid) as LoanRow;

  res.status(201).json({
    id: loan.id,
    user: { id: loan.userId, name: loan.userName, email: loan.userEmail },
    book: {
      id: loan.bookId,
      title: loan.bookTitle,
      author: loan.bookAuthor,
      publishedYear: loan.publishedYear,
    },
    borrowedAt: loan.borrowedAt,
    dueDate: loan.dueDate,
    returned: loan.returned,
  });
};

export { borrowBook };
