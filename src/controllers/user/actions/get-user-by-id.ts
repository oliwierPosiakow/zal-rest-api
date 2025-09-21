import db from "db";

import type { Request, Response } from "express";

const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);

  if (!user) return res.status(404).json({ message: "Użytkownik nie istnieje" });

  res.json(user);
};

export { getUserById };
