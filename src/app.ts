import { assignRoutes } from "@utils/assign-routes";

import express from "express";

import { setupSwagger } from "@config/swagger";

import { setupCronJobs } from "@jobs/setup";

const app = express();
app.use(express.json());

// Swagger
setupSwagger(app);

//CRON
setupCronJobs();

//Routes
assignRoutes(app);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
