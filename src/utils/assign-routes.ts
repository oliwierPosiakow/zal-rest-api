import type { Express } from "express";

import bookRouter from "@routes/book/book.routes";
import loanRouter from "@routes/loan/loan.routes";
import userRouter from "@routes/user/user.routes";

const assignRoutes = (app: Express) => {
  app.use("/books", bookRouter);
  app.use("/loans", loanRouter);
  app.use("/users", userRouter);
};

export { assignRoutes };
