import type { Request, Response } from "express";

import { User } from "@models/user.model";

let users: User[] = [];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);

  if (!user) return res.status(404).json({ message: "Użytkownik nie istnieje" });

  res.json(user);
};

export const addUser = (req: Request, res: Response) => {
  const { id, name, email } = req.body;

  if (users.find((u) => u.id === id)) {
    return res.status(400).json({ message: "Użytkownik o tym ID już istnieje" });
  }

  const newUser = new User(id, name, email);
  users.push(newUser);
  res.status(201).json(newUser);
};

export const deleteUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const initialLength = users.length;
  users = users.filter((u) => u.id !== id);

  if (users.length === initialLength) {
    return res.status(404).json({ message: "Użytkownik nie istnieje" });
  }

  res.status(204).send();
};
