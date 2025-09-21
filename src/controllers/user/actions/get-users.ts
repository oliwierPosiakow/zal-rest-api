import db from "db";

import type { Request, Response } from "express";

const getUsers = (req: Request, res: Response) => {
  const users = db.prepare("SELECT * FROM users").all();
  res.json(users);
};

export { getUsers };
