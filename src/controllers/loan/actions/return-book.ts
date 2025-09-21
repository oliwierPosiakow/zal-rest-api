import db from "db";

import type { Request, Response } from "express";

import type { LoanRow } from "@models/loan.model";

const returnBook = (req: Request, res: Response) => {
  const loanId = Number(req.params.id);

  const loan = db.prepare("SELECT * FROM loans WHERE id = ?").get(loanId) as LoanRow;
  if (!loan) return res.status(404).json({ message: "Nie znaleziono wypożyczenia" });
  if (loan.returned) return res.status(400).json({ message: "Książka już zwrócona" });

  db.prepare("UPDATE loans SET returned = 1 WHERE id = ?").run(loanId);

  res.json({ message: "Książka zwrócona" });
};

export { returnBook };
