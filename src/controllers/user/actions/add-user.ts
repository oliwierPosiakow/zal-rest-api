import db from "db";

import type { Request, Response } from "express";

const addUser = (req: Request, res: Response) => {
  const { name, email } = req.body;

  const result = db.prepare("INSERT INTO users (name, email) VALUES (?, ?)").run(name, email);

  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(result.lastInsertRowid);
  res.status(201).json(user);
};

export { addUser };
