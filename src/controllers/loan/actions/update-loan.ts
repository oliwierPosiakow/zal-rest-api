import db from "db";

import type { Request, Response } from "express";

import type { LoanRow } from "@models/loan.model";

const updateLoan = (req: Request, res: Response) => {
  const loanId = Number(req.params.id);
  const { returned, dueDate } = req.body;

  const existingLoan = db.prepare("SELECT * FROM loans WHERE id = ?").get(loanId);
  if (!existingLoan) return res.status(404).json({ message: "Nie znaleziono wypożyczenia" });

  const updates: string[] = [];
  const values: any[] = [];

  if (returned !== undefined) {
    updates.push("returned = ?");
    values.push(returned ? 1 : 0);
  }

  if (dueDate !== undefined) {
    updates.push("dueDate = ?");
    values.push(new Date(dueDate).toISOString());
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "Nie podano żadnych pól do aktualizacji" });
  }

  values.push(loanId);

  const query = `UPDATE loans SET ${updates.join(", ")} WHERE id = ?`;
  db.prepare(query).run(...values);

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
    .get(loanId) as LoanRow;

  res.json({
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
  });
};

export { updateLoan };
