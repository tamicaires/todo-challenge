import { Component, EventEmitter, inject, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

interface MenuItem {
  label: string;
  value: string;
  icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
  imports: [CommonModule],
})
export class SidebarComponent {
  @Output() filterChanged = new EventEmitter<string>();
  authService = inject(AuthService);

  menuItems: MenuItem[] = [
    { label: 'Home', value: 'home', icon: 'fas fa-home' },
    { label: 'Meu dia', value: 'today', icon: 'fas fa-calendar-day' },
    { label: 'Concluidas', value: 'completed', icon: 'fas fa-check-circle' },
    { label: 'Minhas tasks', value: 'my-tasks', icon: 'fas fa-tasks' },
  ];

  onMenuItemClick(value: string) {
    this.filterChanged.emit(value);
  }

  logout() {
    this.authService.logout();
  }
}
