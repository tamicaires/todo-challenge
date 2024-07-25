import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { jwtKeys } from "../../config/constants";

type TokenPayload = {
  id: string;
  iad: number;
  exp: number;
};

export function AuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Token not provided" });
  }

  const [, token] = authorization.split(" ");

  try {
    const secret = jwtKeys.jwtSecret;

    const decoded = verify(token, secret);
    const { id } = decoded as TokenPayload;
    req.userId = id;

    next();
  } catch {
    return res.status(401).json({ error: "Token invalid" });
  }
}
