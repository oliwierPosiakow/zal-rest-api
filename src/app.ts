import express from "express";
import { setupSwagger } from "./config/swagger.ts";

const app = express();
app.use(express.json());

// Swagger
setupSwagger(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
