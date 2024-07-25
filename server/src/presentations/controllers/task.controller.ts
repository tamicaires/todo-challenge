import { NextFunction } from "express";
import { TaskService } from "../../services/task.service";
import { Request, Response } from "express";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.taskService.create(req.userId, req.body);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async delete(req: Request, res: Response, next: NextFunction) {
    try {
      const { taskId } = req.params;
      await this.taskService.deleteTask(req.userId, taskId);
      res.status(204).send(); // Status 204 No Content indica sucesso na exclusão
    } catch (error) {
      next(error);
    }
  }

  async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.taskService.getAll();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getAllAssignments(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.taskService.getAllAssignments();
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}
