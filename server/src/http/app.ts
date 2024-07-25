import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import router from "../routes";

const app = express();

app.use(express.json());
app.use(cors());

app.use(router);
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).json({ message: err.message });
});

export default app;
