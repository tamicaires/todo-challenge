export interface Task {
  id?: string;
  title: string;
  description?: string;
  isDone: boolean;
  expectedDate: Date;
  createdBy?: string;
  createdAt?: Date;
  completedAt?: Date;
  updatedAt?: Date;
  users?: string[];
}
