import { Router } from "express";
import { UserController } from "../presentations/controllers/user.controller";
import { AuthController } from "../presentations/controllers/auth.controller";
import { AuthMiddleware } from "../presentations/middlewares/auth.middleware";
import { SequelizeUserRepository } from "../database/repositories/SequelizeUserRepository";
import { UserService } from "../services/user.service";

const userRepository = new SequelizeUserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

const authControl = new AuthController();

const userRouter = Router();

userRouter.get("/users", AuthMiddleware, userController.getAll.bind(userController));
userRouter.post("/users", userController.create.bind(userController));
userRouter.post("/auth/login", authControl.authenticate.bind(authControl));

export default userRouter;
