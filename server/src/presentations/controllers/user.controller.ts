import { NextFunction, Request, Response } from "express";
import { UserService } from "../../services/user.service";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userService.create(req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.userService.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
