import { Component, EventEmitter, Output } from '@angular/core';
import { NgForm, FormsModule } from '@angular/forms'; // Importar FormsModule
import { Task } from '../../types/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [FormsModule], // Adicione FormsModule aqui
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css'],
})
export class TaskFormComponent {
  newTask: Task = {
    title: '',
    isDone: false,
    expectedDate: new Date(), // Inicialize com a data atual ou um valor padrão
  };

  @Output() taskCreated = new EventEmitter<Task>();

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Converte expectedDate de string para Date
      const date = new Date(this.newTask.expectedDate);
      if (!isNaN(date.getTime())) {
        this.newTask.expectedDate = date;
      } else {
        // Se a data for inválida, você pode lidar com isso de acordo
        console.error('Data inválida:', this.newTask.expectedDate);
        return;
      }

      this.taskCreated.emit(this.newTask);
      this.newTask = {
        title: '',
        isDone: false,
        expectedDate: new Date(), // Inicialize com a data atual ou um valor padrão
      };
    }
  }
}
