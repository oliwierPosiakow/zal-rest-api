import { Book } from "@models/book.model";
import { User } from "@models/user.model";

export interface ILoan {
  id: number;
  user: User;
  book: Book;
  borrowedAt: Date;
  dueDate: Date;
  returned: boolean;
}

export class Loan implements ILoan {
  constructor(
    public id: number,
    public user: User,
    public book: Book,
    public borrowedAt: Date,
    public dueDate: Date,
    public returned: boolean = false,
  ) {}
}
