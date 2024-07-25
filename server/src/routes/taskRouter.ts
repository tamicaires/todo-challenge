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

taskRouter.post("/tasks", AuthMiddleware,
  taskController.create.bind(taskController)
);

taskRouter.get("/tasks", taskController.getAll.bind(taskController));
taskRouter.get("/tasks/assignments", AuthMiddleware,
  taskController.getAllAssignments.bind(taskController)
);

taskRouter.delete("/tasks/:taskId",
  taskController.delete.bind(taskController)
);
export default taskRouter;
