export class CreateTaskDTO {
  title!: string;
  description?: string;
  isDone!: boolean;
  expectedDate!: Date;
  users!: string[];
}

export class UpdateTaskDTO {
  id?: string;
  title?: string;
  description?: string;
  isDone?: boolean;
  expectedDate?: Date;
  completedAt?: Date
  users?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}