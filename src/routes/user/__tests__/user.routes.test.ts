import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import userRouter from "@routes/user/user.routes";

const app = express();
app.use(express.json());
app.use("/users", userRouter);

describe("Users API Routes", () => {
  beforeEach(() => {
    // Czyścimy tabelę users przed każdym testem
    db.prepare("DELETE FROM users").run();
  });

  it("GET /users should return empty array initially", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  it("POST /users should create a new user", async () => {
    const res = await request(app).post("/users").send({ name: "Jan Test", email: "jan@test.com" });

    expect(res.status).toBe(201);
    expect(res.body.id).toBeDefined();
    expect(res.body.name).toBe("Jan Test");
    expect(res.body.email).toBe("jan@test.com");
  });

  it("GET /users/:id should return the created user", async () => {
    const postRes = await request(app)
      .post("/users")
      .send({ name: "Anna Kowalska", email: "anna@test.com" });

    const id = postRes.body.id;
    const getRes = await request(app).get(`/users/${id}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(id);
    expect(getRes.body.name).toBe("Anna Kowalska");
  });

  it("PATCH /users/:id should update user data", async () => {
    const postRes = await request(app)
      .post("/users")
      .send({ name: "Piotr", email: "piotr@test.com" });

    const id = postRes.body.id;
    const patchRes = await request(app)
      .patch(`/users/${id}`)
      .send({ name: "Piotr Nowak", email: "piotr.nowak@test.com" });

    expect(patchRes.status).toBe(200);
    expect(patchRes.body.name).toBe("Piotr Nowak");
    expect(patchRes.body.email).toBe("piotr.nowak@test.com");
  });

  it("DELETE /users/:id should remove a user", async () => {
    const postRes = await request(app)
      .post("/users")
      .send({ name: "Usuwany", email: "usun@test.com" });

    const id = postRes.body.id;
    const delRes = await request(app).delete(`/users/${id}`);

    expect(delRes.status).toBe(204);

    const getRes = await request(app).get(`/users/${id}`);
    expect(getRes.status).toBe(404);
  });

  it("GET /users/:id for non-existent user should return 404", async () => {
    const res = await request(app).get("/users/9999");
    expect(res.status).toBe(404);
  });
});
