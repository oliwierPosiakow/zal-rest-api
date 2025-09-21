import express from "express";

import { setupSwagger } from "@config/swagger.ts";

import bookRouter from "@routes/book/book.routes";
import loanRouter from "@routes/loan/loan.routes";
import userRouter from "@routes/user/user.routes";

const app = express();
app.use(express.json());

// Swagger
setupSwagger(app);

//Routes
app.use("/books", bookRouter);
app.use("/loans", loanRouter);
app.use("/users", userRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
