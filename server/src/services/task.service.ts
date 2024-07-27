import { randomUUID } from "crypto";
import { TaskRepository } from "../core/abstracts/task.abstract";
import { UserRepository } from "../core/abstracts/user.abstract";
import { CreateTaskDTO, UpdateTaskDTO } from "../core/dtos/task.dto";
import { Task } from "../core/entities/task.entity";
import UserTask from "../database/models/UserTask";
import { UserTaskRepository } from "../core/abstracts/userTask.abstract";

UserTask.associations;

export class TaskService {
  constructor(
    private userRepository: UserRepository,
    private taskRepository: TaskRepository,
    private userTaskRepository: UserTaskRepository
  ) {}

  async create(userId: string, taskDto: CreateTaskDTO) {
    const user = await this.userRepository.get(userId);
    console.log("UserService dentro de task:", user, user?.id);

    if (!user) {
      throw new Error("User not found.");
    }

    const taskData: Task = {
      id: randomUUID(),
      title: taskDto.title,
      description: taskDto.description,
      isDone: taskDto.isDone || false,
      expectedDate: taskDto.expectedDate || new Date(),
      createdBy: user.id,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const createdTask = await this.taskRepository.create(taskData);
    console.log("Created Task:", createdTask);

    if (!user.id || !createdTask.id) {
      throw new Error("User ID or Task ID is missing");
    }

    const relation = await this.userTaskRepository.assignUserToTask(
      user.id,
      createdTask.id
    );
    console.log("Relation Created:", relation);

    return createdTask;
  }

  async update(userId: string, taskId: string, data: UpdateTaskDTO) {
    const user = await this.userRepository.get(userId);
    console.log("user no service", user);
    if (!user) {
      throw new Error("User not found.");
    }

    const existingTask = await this.taskRepository.findById(taskId);

    if (!existingTask) {
      throw new Error("Task not found.");
    }

    const updatedTaskData: Partial<Task> = {};

    if (data.title !== undefined) updatedTaskData.title = data.title;
    if (data.description !== undefined)
      updatedTaskData.description = data.description;
    if (data.isDone !== undefined) updatedTaskData.isDone = data.isDone;
    if (data.expectedDate !== undefined)
      updatedTaskData.expectedDate = new Date(data.expectedDate);

    return await this.taskRepository.update(
      user.id as string,
      taskId,
      updatedTaskData
    );
  }

  async deleteTask(userId: string, taskId: string) {
    const user = await this.userRepository.get(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    const task = await this.taskRepository.findById(taskId);
    if (!task) {
      throw new Error("Task not found.");
    }

    if (task.createdBy === userId) {
      return await this.taskRepository.delete(taskId);
    }

    throw new Error("You're not allowed to delete this task!");
  }

  async getAll() {
    return await this.taskRepository.getAll();
  }

  async getByUser(userId: string, taskId: string) {
    const user = await this.userRepository.get(userId);
    return;
  }

  async getAllAssignments() {
    return await this.userTaskRepository.getAllAssignments();
  }
}
