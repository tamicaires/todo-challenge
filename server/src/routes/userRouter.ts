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

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Authenticate a user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       200:
 *         description: Successful authentication
 *       401:
 *         description: Unauthorized
 */
userRouter.post("/auth/login", authControl.authenticate.bind(authControl));

/**
 * @swagger
 * /users:
 *   post:
 *     summary: Create a new user
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - name
 *               - password
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */
userRouter.post("/users", userController.create.bind(userController));

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: List of users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 */
userRouter.get(
  "/users",
  AuthMiddleware,
  userController.getAll.bind(userController)
);

/**
 * @swagger
 * /me:
 *   get:
 *     summary: Get the current authenticated user
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: The current authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
userRouter.get(
  "/me",
  AuthMiddleware,
  userController.getMe.bind(userController)
);

export default userRouter;
