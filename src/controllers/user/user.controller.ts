import db from "db";

import type { Request, Response } from "express";

export const getUsers = (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) return res.status(404).json({ message: "Użytkownik nie istnieje" });

  res.json(user);
};

export const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  const result = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(user);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Użytkownik nie istnieje" });
  }

  res.status(204).send();
};
