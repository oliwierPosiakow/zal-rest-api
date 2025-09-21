import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

import type { Express } from "express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Wypożyczalnia książek REST API", version: "1.0.0" },
  },
  apis: ["./src/routes/**/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
