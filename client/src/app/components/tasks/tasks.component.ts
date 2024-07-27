import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
// import { TaskService } from '../../services/task.service';
// import { Task } from '../../types/task';
import { TaskCardComponent } from '../task-card/task-card.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
// import { formatDate } from '../utils/date-utils';
// import { ObjectKeysPipe } from '../../pipes/object-keys.pipe';
import { TaskModalComponent } from '../task-modal/task-modal.component';
import { ObjectKeysPipe } from '../../pipes/object-keys.pipe';
import { Task } from '../../types/task';
import { formatDate } from '../../utils/date-utils';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CommonModule,
    TaskCardComponent,
    SidebarComponent,
    ObjectKeysPipe,
    TaskModalComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit, OnChanges {
  @Input() filter: string = 'home';
  tasks: Task[] = [];
  filteredTasks: { [key: string]: Task[] } = {};
  groupingTitle: string = '';
  expandedGroups: { [key: string]: boolean } = {};
  showModal: boolean = false;
  isEditing: boolean = false; 
  editingTask: Task = this.getEmptyTask(); 

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((data) => {
      this.tasks = data;
      this.applyFilter();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['filter']) {
      this.applyFilter();
    }
  }

  applyFilter() {
    const today = new Date().toISOString().split('T')[0];

    const groupedByDate = this.tasks.reduce((acc, task) => {
      const formattedDate = formatDate(task.expectedDate);
      if (!acc[formattedDate]) acc[formattedDate] = [];
      acc[formattedDate].push(task);
      return acc;
    }, {} as { [key: string]: Task[] });

    switch (this.filter) {
      case 'home':
        this.groupingTitle = 'Tarefas';
        this.filteredTasks = {
          Pendente: this.tasks.filter((task) => !task.isDone),
          Concluída: this.tasks.filter((task) => task.isDone),
        };
        break;
      case 'completed':
        this.groupingTitle = 'Concluídas';
        this.filteredTasks = Object.keys(groupedByDate).reduce((acc, date) => {
          acc[date] = groupedByDate[date].filter((task) => task.isDone);
          return acc;
        }, {} as { [key: string]: Task[] });
        break;
      case 'today':
        this.groupingTitle = 'Hoje';
        this.filteredTasks = {
          Pendente: groupedByDate[today]?.filter((task) => !task.isDone) || [],
          Concluída: groupedByDate[today]?.filter((task) => task.isDone) || [],
        };
        break;
      case 'my-tasks':
        this.groupingTitle = 'Minhas Tarefas';
        this.filteredTasks = groupedByDate;
        break;
      default:
        this.groupingTitle = 'Tarefas';
        this.filteredTasks = groupedByDate;
        break;
    }

    this.expandedGroups = Object.keys(this.filteredTasks).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {} as { [key: string]: boolean });
  }

  toggleGroup(group: string) {
    this.expandedGroups[group] = !this.expandedGroups[group];
  }

  onTaskUpdated(updatedTask: Task) {
    this.tasks = this.tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.applyFilter();
  }

  onTaskDeleted(deletedTask: Task) {
    this.tasks = this.tasks.filter((task) => task.id !== deletedTask.id);
    this.applyFilter();
  }

  openModal(taskToEdit?: Task) {
    this.isEditing = !!taskToEdit;
    this.editingTask = taskToEdit ? { ...taskToEdit } : this.getEmptyTask();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.isEditing = false;
    this.editingTask = this.getEmptyTask();
  }

  createTask(task: Task) {
    this.taskService.createTask(task).subscribe((newTask) => {
      this.tasks.push(newTask);
      this.applyFilter();
      this.closeModal();
    });
  }

  editTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe((task) => {
      this.onTaskUpdated(task);
      this.closeModal();
    });
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
