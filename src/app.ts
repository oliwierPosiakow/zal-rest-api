import { assignRoutes } from "@utils/assign-routes";

import express from "express";

import { setupSwagger } from "@config/swagger";

const app = express();
app.use(express.json());

// Swagger
setupSwagger(app);

//Routes
assignRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
