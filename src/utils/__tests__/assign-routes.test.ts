import { beforeEach, describe, expect, it } from "bun:test";
import db from "db";
import request from "supertest";

import express from "express";

import { assignRoutes } from "../assign-routes";

const app = express();
app.use(express.json());
assignRoutes(app);

describe("assignRoutes", () => {
  beforeEach(() => {
    db.prepare("DELETE FROM books").run();
    db.prepare("DELETE FROM users").run();
    db.prepare("DELETE FROM loans").run();
  });

  it("should mount /books route", async () => {
    const res = await request(app).get("/books");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should mount /users route", async () => {
    const res = await request(app).get("/users");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should mount /loans route", async () => {
    const res = await request(app).get("/loans");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
