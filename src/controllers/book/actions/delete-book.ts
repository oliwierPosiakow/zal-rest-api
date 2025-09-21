import db from "db";

import type { Request, Response } from "express";

const deleteBook = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  db.prepare("DELETE FROM books WHERE id = ?").run(id);
  res.status(204).send();
};

export { deleteBook };
