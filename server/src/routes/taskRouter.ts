import { Router } from "express";
import { TaskService } from "../services/task.service";
import { SequelizeTaskRepository } from "../database/repositories/SequelizeTaskRepository";
import { SequelizeUserRepository } from "../database/repositories/SequelizeUserRepository";
import { TaskController } from "../presentations/controllers/task.controller";
import { AuthMiddleware } from "../presentations/middlewares/auth.middleware";
import { SequelizeUserTaskRepository } from "../database/repositories/SequelizeUserTaskRepository";

const userRepository = new SequelizeUserRepository();
const taskRepository = new SequelizeTaskRepository();
const userTaskRepository = new SequelizeUserTaskRepository();
const taskService = new TaskService(
  userRepository,
  taskRepository,
  userTaskRepository
);
const taskController = new TaskController(taskService);

const taskRouter = Router();

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     security:
 *       - Bearer: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request
 */
taskRouter.post("/tasks", AuthMiddleware, taskController.create.bind(taskController));

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: List of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
taskRouter.get("/tasks", AuthMiddleware, taskController.getAll.bind(taskController));

/**
 * @swagger
 * /tasks/assignments:
 *   get:
 *     summary: Get all task assignments
 *     security:
 *       - Bearer: []
 *     responses:
 *       200:
 *         description: List of task assignments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Task'
 */
taskRouter.get("/tasks/assignments", AuthMiddleware, taskController.getAllAssignments.bind(taskController));

/**
 * @swagger
 * /tasks/{taskId}:
 *   delete:
 *     summary: Delete a task by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: ID of the task to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
taskRouter.delete("/tasks/:taskId", AuthMiddleware, taskController.delete.bind(taskController));

/**
 * @swagger
 * /tasks/{taskId}:
 *   put:
 *     summary: Update a task by ID
 *     security:
 *       - Bearer: []
 *     parameters:
 *       - name: taskId
 *         in: path
 *         required: true
 *         description: ID of the task to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Task not found
 */
taskRouter.put("/tasks/:taskId", AuthMiddleware, taskController.update.bind(taskController));


export default taskRouter;
