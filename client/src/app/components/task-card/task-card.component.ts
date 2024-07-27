import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent {
  @Input() task!: Task;
  @Output() taskUpdated = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<Task>();
  @Output() taskEdited = new EventEmitter<Task>();

  isEditingTitle = false;

  constructor(private taskService: TaskService) {}

  onToggle(task: Task) {
    task.isDone = !task.isDone;
    this.taskService.updateTask(task).subscribe((updatedTask) => {
      this.taskUpdated.emit(updatedTask);
    });
  }

  startEditingTitle() {
    this.isEditingTitle = true;
  }

  finishEditingTitle(event: any) {
    this.isEditingTitle = false;
    const newTitle = event.target.value.trim();
    if (newTitle && newTitle !== this.task.title) {
      this.task.title = newTitle;
      this.taskService.updateTask(this.task).subscribe((updatedTask) => {
        this.taskUpdated.emit(updatedTask);
      });
    }
  }

  onEditTask(task: Task) {
    this.taskEdited.emit(task);
  }

  onAddResponsible(task: Task) {
    // Lógica para adicionar responsável
  }

  onDeleteTask(task: Task) {
    if (task.id) {
      this.taskService.deleteTask(task.id).subscribe(() => {
        this.taskDeleted.emit(task);
      });
    }
  }
}
