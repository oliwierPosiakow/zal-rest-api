// src/controllers/loanController.ts
import type { Request, Response } from "express";

import { Book } from "@models/book.model";
import { Loan } from "@models/loan.model";
import { User } from "@models/user.model";

let loans: Loan[] = [];
let users: User[] = [new User(1, "Jan Kowalski", "jan@example.com")];
let books: Book[] = [new Book(1, "Pan Tadeusz", "Adam Mickiewicz", 1834)];

export const borrowBook = (req: Request, res: Response) => {
  const { userId, bookId } = req.body;

  const user = users.find((u) => u.id === userId);
  const book = books.find((b) => b.id === bookId);

  if (!user) return res.status(404).json({ message: "Nie znaleziono użytkownika" });
  if (!book) return res.status(404).json({ message: "Nie znaleziono książki" });

  // check if book is already borrowed
  const alreadyLoaned = loans.find((l) => l.book.id === bookId && !l.returned);
  if (alreadyLoaned) {
    return res.status(400).json({ message: "Książka już wypożyczona" });
  }

  const loan = new Loan(
    loans.length + 1,
    user,
    book,
    new Date(),
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // due in 14 days
  );

  loans.push(loan);
  res.status(201).json(loan);
};

export const returnBook = (req: Request, res: Response) => {
  const loanId = Number(req.params.id);
  const loan = loans.find((l) => l.id === loanId);

  if (!loan) return res.status(404).json({ message: "Nie znaleziono wypożyczenia" });
  if (loan.returned) return res.status(400).json({ message: "Książka już zwrócona" });

  loan.returned = true;
  res.json({ message: "Książka zwrócona", loan });
};

export const getLoans = (req: Request, res: Response) => {
  res.json(loans);
};
