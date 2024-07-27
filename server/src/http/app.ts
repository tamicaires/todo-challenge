import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import router from "../routes"; // Ajuste o caminho conforme necessário

const app = express();

// Swagger configuration
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Todo Swagger",
    version: "1.0.0",
    description: "Documentação todo list tasks",
  },
  servers: [
    {
      url: "http://localhost:3001",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const swaggerOptions = {
  definition: swaggerDefinition,
  apis: ["./src/routes/*.ts"], 
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const corsOptions = {
  origin: "*",
  methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(router);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
