import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import { addBook, getBooks } from "@controllers/book";

const app = express();
app.use(express.json());
app.get("/books", getBooks);
app.post("/books", addBook);

describe("getBooks controller", () => {
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
  });

  it("should return empty array if no books exist", async () => {
    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("should return all books", async () => {
    await request(app)
      .post("/books")
      .send({ title: "Książka 1", author: "Autor 1", publishedYear: 2020 });
    await request(app)
      .post("/books")
      .send({ title: "Książka 2", author: "Autor 2", publishedYear: 2021 });

    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(res.body.length).toBe(2);

    expect(res.body[0].title).toBe("Książka 1");
    expect(res.body[1].title).toBe("Książka 2");
  });
});
