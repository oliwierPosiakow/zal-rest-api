import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import bookRouter from "@routes/book/book.routes";
import loanRouter from "@routes/loan/loan.routes";
import userRouter from "@routes/user/user.routes";

const app = express();
app.use(express.json());
app.use("/books", bookRouter);
app.use("/users", userRouter);
app.use("/loans", loanRouter);

describe("Loans API Routes", () => {
  let userId: number;
  let bookId: number;

  beforeEach(async () => {
    // Czyścimy tabelki przed każdym testem
    db.prepare("DELETE FROM loans").run();
    db.prepare("DELETE FROM books").run();
    db.prepare("DELETE FROM users").run();

    // Dodajemy testowego użytkownika i książkę
    const user = db
      .prepare("INSERT INTO users (name, email) VALUES (?, ?)")
      .run("Jan Test", "jan@test.com");
    userId = Number(user.lastInsertRowid);

    const book = db
      .prepare("INSERT INTO books (title, author, publishedYear) VALUES (?, ?, ?)")
      .run("Test Book", "Autor", 2022);
    bookId = Number(book.lastInsertRowid);
  });

  it("GET /loans should return empty array initially", async () => {
    const res = await request(app).get("/loans");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("POST /loans/borrow should create a new loan", async () => {
    const res = await request(app).post("/loans/borrow").send({ userId, bookId });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();

    // Zmienione na strukturę zagnieżdżoną
    expect(res.body.user.id).toBe(userId);
    expect(res.body.book.id).toBe(bookId);

    expect(res.body.returned).toBe(0);
  });

  it("POST /loans/return/:id should mark loan as returned", async () => {
    const loan = db
      .prepare(
        "INSERT INTO loans (userId, bookId, borrowedAt, dueDate, returned) VALUES (?, ?, ?, ?, ?)",
      )
      .run(
        userId,
        bookId,
        new Date().toISOString(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        0,
      );

    const loanId = Number(loan.lastInsertRowid);

    const res = await request(app).post(`/loans/return/${loanId}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Książka zwrócona');
  });

  it("PATCH /loans/:id should update dueDate and returned", async () => {
    const loan = db
      .prepare(
        "INSERT INTO loans (userId, bookId, borrowedAt, dueDate, returned) VALUES (?, ?, ?, ?, ?)",
      )
      .run(
        userId,
        bookId,
        new Date().toISOString(),
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        0,
      );

    const loanId = Number(loan.lastInsertRowid);
    const newDueDate = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString();

    const res = await request(app)
      .patch(`/loans/${loanId}`)
      .send({ returned: true, dueDate: newDueDate });

    expect(res.status).toBe(200);
    expect(res.body.returned).toBe(true);
    expect(res.body.dueDate).toBe(newDueDate);
  });

  it("PATCH /loans/:id for non-existent loan should return 404", async () => {
    const res = await request(app).patch("/loans/9999").send({ returned: true });

    expect(res.status).toBe(404);
  });

  it("POST /loans/return/:id for non-existent loan should return 404", async () => {
    const res = await request(app).post("/loans/return/9999");
    expect(res.status).toBe(404);
  });
});
