import db from "db";

import type { Request, Response } from "express";

import type { LoanRow } from "@models/loan.model";

const getLoans = (req: Request, res: Response) => {
  const loans = db
    .prepare(
      `SELECT l.id, l.borrowedAt, l.dueDate, l.returned,
              u.id as userId, u.name as userName, u.email as userEmail,
              b.id as bookId, b.title as bookTitle, b.author as bookAuthor, b.publishedYear
       FROM loans l
       JOIN users u ON l.userId = u.id
       JOIN books b ON l.bookId = b.id
       ORDER BY l.id DESC`,
    )
    .all() as LoanRow[];

  const serializedLoans = loans.map((loan) => ({
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
    returned: loan.returned === 1,
  }));

  res.json(serializedLoans);
};

export { getLoans };
