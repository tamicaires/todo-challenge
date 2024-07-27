import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TasksComponent } from "../../components/tasks/tasks.component";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, SidebarComponent, TasksComponent],
  templateUrl: './mainlayout.component.html',
  styleUrls: ['./mainlayout.component.css'],
})
export class MainLayoutComponent {
  currentFilter: string = 'home'; 

  updateFilter(filter: string) {
    this.currentFilter = filter;
  }
}
