import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import type { Book } from "@models/book.model";

import { addBook } from "@controllers/book/actions/add-book";

const app = express();
app.use(express.json());
app.post("/books", addBook);

describe("addBook controller", () => {
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
  });

  it("should add a new book and return it", async () => {
    const res = await request(app).post("/books").send({
      title: "Test Book",
      author: "Autor Testowy",
      publishedYear: 2022,
    });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("Test Book");
    expect(res.body.author).toBe("Autor Testowy");
    expect(res.body.publishedYear).toBe(2022);

    const bookInDb = db.prepare("SELECT * FROM books WHERE id = ?").get(res.body.id) as Book;
    expect(bookInDb).toBeDefined();
    expect(bookInDb.title).toBe("Test Book");
  });

  it("should fail if required fields are missing", async () => {
    const res = await request(app).post("/books").send({ title: "Incomplete" });
    // Twój endpoint może zwracać 500 lub 400 – dostosuj w zależności od implementacji
    expect([400, 500]).toContain(res.status);
  });
});
