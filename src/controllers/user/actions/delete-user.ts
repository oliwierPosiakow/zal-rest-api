import db from "db";

import type { Request, Response } from "express";

const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const result = db.prepare("DELETE FROM users WHERE id = ?").run(id);

  if (result.changes === 0) {
    return res.status(404).json({ message: "Użytkownik nie istnieje" });
  }

  res.status(204).send();
};

export { deleteUser };
