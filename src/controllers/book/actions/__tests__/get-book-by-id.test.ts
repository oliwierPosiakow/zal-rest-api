import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import { addBook, getBookById } from "@controllers/book";

const app = express();
app.use(express.json());
app.get("/books/:id", getBookById);
app.post("/books", addBook);

describe("getBookById controller", () => {
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
  });

  it("should return a book by id", async () => {
    const bookRes = await request(app)
      .post("/books")
      .send({ title: "Test Book", author: "Autor", publishedYear: 2022 });

    const id = bookRes.body.id;

    const getRes = await request(app).get(`/books/${id}`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(id);
    expect(getRes.body.title).toBe("Test Book");
    expect(getRes.body.author).toBe("Autor");
    expect(getRes.body.publishedYear).toBe(2022);
  });

  it("should return 404 if book does not exist", async () => {
    const res = await request(app).get("/books/9999");
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Książka nie znaleziona");
  });
});
