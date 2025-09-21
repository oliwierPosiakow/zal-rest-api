import db from "db";

import type { Request, Response } from "express";

const updateUser = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  const { name, email } = req.body;

  const existingUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
  if (!existingUser) return res.status(404).json({ message: "Nie znaleziono użytkownika" });

  const updates: string[] = [];
  const values: any[] = [];

  if (name !== undefined) {
    updates.push("name = ?");
    values.push(name);
  }

  if (email !== undefined) {
    updates.push("email = ?");
    values.push(email);
  }

  if (updates.length === 0) {
    return res.status(400).json({ message: "Nie podano pól do aktualizacji" });
  }

  values.push(userId);

  const query = `UPDATE users SET ${updates.join(", ")} WHERE id = ?`;
  db.prepare(query).run(...values);

  const updatedUser = db.prepare("SELECT * FROM users WHERE id = ?").get(userId);
  res.json(updatedUser);
};

export { updateUser };
