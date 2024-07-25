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

  async findTaskByUserId(userId: string, taskId: string): Promise<Task | null> {
    return await this.model.findOne({ where: { user_id: userId, id: taskId } });
  }

  async update(
    userId: string,
    taskId: string,
    task: UpdateTaskDTO
  ): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async delete(taskId: string): Promise<void> {
    const result = await this.model.destroy({
      where: { id: taskId },
    });

    if (result === 0) {
      throw new Error(`Task with id ${taskId} not found.`);
    }
  }

  async findById(taskId: string): Promise<Task | null> {
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
