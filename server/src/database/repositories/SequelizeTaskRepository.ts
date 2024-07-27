import { ModelStatic } from "sequelize";
import { TaskRepository } from "../../core/abstracts/task.abstract";
import TaskModel from "../models/Task";
import { Task } from "../../core/entities/task.entity";
import { UpdateTaskDTO } from "../../core/dtos/task.dto";
import UserModel from "../models/User";

export class SequelizeTaskRepository implements TaskRepository {
  private model: ModelStatic<TaskModel> = TaskModel;

  async create(task: Task): Promise<Task> {
    console.log("task do repository", task);
    const response = await this.model.create({ ...task });

    console.log("sequelize", response.dataValues);

    return response;
  }

  async findById(taskId: string): Promise<Task | null> {
    // Encontrar a tarefa pelo ID
    return await this.model.findByPk(taskId, {
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }

  async update(
    userId: string,
    taskId: string,
    task: UpdateTaskDTO
  ): Promise<Task> {
    const [updateCount, [updatedTask]] = await this.model.update(task, {
      where: { id: taskId },
      returning: true,
    });

    if (updateCount === 0) {
      throw new Error(`Task with id ${taskId} not found or not updated.`);
    }

    return updatedTask;
  }

  async delete(taskId: string): Promise<void> {
    const result = await this.model.destroy({
      where: { id: taskId },
    });

    if (result === 0) {
      throw new Error(`Task with id ${taskId} not found.`);
    }
  }

  async getAll(): Promise<Task[]> {
    return await this.model.findAll({
      include: [
        {
          model: UserModel,
          as: "users",
          attributes: ["id", "name", "email"],
        },
      ],
    });
  }
}
