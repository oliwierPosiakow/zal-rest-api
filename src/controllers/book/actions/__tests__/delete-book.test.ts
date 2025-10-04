import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import { addBook, deleteBook } from "@controllers/book";

const app = express();
app.use(express.json());
app.delete("/books/:id", deleteBook);
app.post("/books", addBook);

describe("deleteBook controller", () => {
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
  });

  it("should delete an existing book", async () => {
    const bookRes = await request(app)
      .post("/books")
      .send({ title: "Do usunięcia", author: "Autor", publishedYear: 2022 });

    const id = bookRes.body.id;

    const delRes = await request(app).delete(`/books/${id}`);
    expect(delRes.status).toBe(204);

    const getBook = db.prepare("SELECT * FROM books WHERE id = ?").get(id);
    expect(getBook).toBeNull();
  });

  it("should return 204 even if the book does not exist", async () => {
    const res = await request(app).delete("/books/9999");
    expect(res.status).toBe(204);
  });
});
