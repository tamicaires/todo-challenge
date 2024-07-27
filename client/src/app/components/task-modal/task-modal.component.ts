import {
  Component,
  EventEmitter,
  Output,
  Input,
  OnInit,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
// import { Task } from '../../types/task';
import { CommonModule } from '@angular/common';
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-modal',
  standalone: true,
  templateUrl: './task-modal.component.html',
  styleUrls: ['./task-modal.component.css'],
  imports: [CommonModule, FormsModule],
})
export class TaskModalComponent implements OnInit, OnChanges {
  @Input() isVisible: boolean = false;
  @Input() task: Task | null = null; 
  @Input() isEditing: boolean = false; 

  @Output() close = new EventEmitter<void>();
  @Output() taskCreated = new EventEmitter<Task>();
  @Output() taskUpdated = new EventEmitter<Task>();

  newTask: Task = this.getEmptyTask();

  ngOnInit() {
    if (this.isEditing && this.task) {
      this.newTask = { ...this.task };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['task'] && this.task) {
      this.newTask = { ...this.task };
    }
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const date = new Date(this.newTask.expectedDate);
      if (!isNaN(date.getTime())) {
        this.newTask.expectedDate = date;
        if (this.isEditing) {
          this.taskUpdated.emit(this.newTask);
        } else {
          this.taskCreated.emit(this.newTask);
        }
        this.resetForm();
        this.close.emit();
      } else {
        console.error('Data inválida:', this.newTask.expectedDate);
      }
    }
  }

  resetForm() {
    this.newTask = this.getEmptyTask();
  }

  private getEmptyTask(): Task {
    return {
      title: '',
      description: '',
      expectedDate: new Date(),
      isDone: false,
    };
  }
}
