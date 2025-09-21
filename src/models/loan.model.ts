import { Book } from "@models/book.model";
import { User } from "@models/user.model";

export type TLoan = {
  id: number;
  user: User;
  book: Book;
  borrowedAt: Date;
  dueDate: Date;
  returned: boolean;
};

export type LoanRow = {
  id: number;
  borrowedAt: string;
  dueDate: string;
  returned: number;
  userId: number;
  userName: string;
  userEmail: string;
  bookId: number;
  bookTitle: string;
  bookAuthor: string;
  publishedYear: number;
};

export class Loan implements TLoan {
  constructor(
    public id: number,
    public user: User,
    public book: Book,
    public borrowedAt: Date,
    public dueDate: Date,
    public returned: boolean = false,
  ) {}
}
