import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "../routes";

const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
