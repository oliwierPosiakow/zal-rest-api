import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import { addBook, updateBook } from "@controllers/book";

const app = express();
app.use(express.json());
app.patch("/books/:id", updateBook);
app.post("/books", addBook);

describe("updateBook controller", () => {
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
  });

  it("should update existing book partially", async () => {
    const bookRes = await request(app)
      .post("/books")
      .send({ title: "Original", author: "Autor", publishedYear: 2022 });

    const id = bookRes.body.id;

    const patchRes = await request(app).patch(`/books/${id}`).send({ title: "Updated Title" });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.id).toBe(id);
    expect(patchRes.body.title).toBe("Updated Title");
    expect(patchRes.body.author).toBe("Autor");
  });

  it("should update multiple fields", async () => {
    const bookRes = await request(app)
      .post("/books")
      .send({ title: "Old", author: "Old Author", publishedYear: 2020 });

    const id = bookRes.body.id;

    const patchRes = await request(app)
      .patch(`/books/${id}`)
      .send({ title: "New", author: "New Author", publishedYear: 2022 });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.title).toBe("New");
    expect(patchRes.body.author).toBe("New Author");
    expect(patchRes.body.publishedYear).toBe(2022);
  });

  it("should return 404 if book does not exist", async () => {
    const res = await request(app).patch("/books/9999").send({ title: "X" });
    expect(res.status).toBe(404);
    expect(res.body.message).toBe("Książka nie instnieje");
  });

  it("should return 400 if no fields provided", async () => {
    const bookRes = await request(app)
      .post("/books")
      .send({ title: "NoUpdate", author: "Autor", publishedYear: 2021 });

    const id = bookRes.body.id;
    const res = await request(app).patch(`/books/${id}`).send({});
    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Nie podano pól do aktualizacji");
  });
});
