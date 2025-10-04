import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import bookRouter from "@routes/book/book.routes";

const app = express();
app.use(express.json());
app.use("/books", bookRouter);

describe("Books API Routes", () => {
  // Czyścimy tabelę przed każdym testem
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
  });

  it("GET /books should return an empty array initially", async () => {
    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("POST /books should create a new book", async () => {
    const res = await request(app)
      .post("/books")
      .send({ title: "Testowa książka", author: "Autor Testowy", publishedYear: 2024 });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.title).toBe("Testowa książka");
    expect(res.body.author).toBe("Autor Testowy");
    expect(res.body.publishedYear).toBe(2024);
  });

  it("GET /books/:id should return the created book", async () => {
    const postRes = await request(app)
      .post("/books")
      .send({ title: "Książka do GET", author: "Autor", publishedYear: 2020 });

    const id = postRes.body.id;
    const getRes = await request(app).get(`/books/${id}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(id);
    expect(getRes.body.title).toBe("Książka do GET");
  });

  it("PATCH /books/:id should partially update a book", async () => {
    const postRes = await request(app)
      .post("/books")
      .send({ title: "Stara nazwa", author: "Autor", publishedYear: 2021 });

    const id = postRes.body.id;
    const patchRes = await request(app).patch(`/books/${id}`).send({ title: "Nowa nazwa" });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.title).toBe("Nowa nazwa");
    expect(patchRes.body.author).toBe("Autor");
  });

  it("DELETE /books/:id should remove a book", async () => {
    const postRes = await request(app)
      .post("/books")
      .send({ title: "Do usunięcia", author: "Autor", publishedYear: 2022 });

    const id = postRes.body.id;
    const delRes = await request(app).delete(`/books/${id}`);

    expect(delRes.status).toBe(204);

    const getRes = await request(app).get(`/books/${id}`);
    expect(getRes.status).toBe(404);
  });

  it("GET /books/:id for non-existent book should return 404", async () => {
    const res = await request(app).get("/books/9999");
    expect(res.status).toBe(404);
  });
});
