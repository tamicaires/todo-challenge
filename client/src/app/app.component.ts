  import { Component, inject } from '@angular/core';
  import { RouterOutlet } from '@angular/router';
  import { MainLayoutComponent } from './layout/mainlayout/mainlayout.component';
  import { CommonModule } from '@angular/common';
  import { AuthService } from './services/auth.service';
  // import { HeaderComponent } from './components/header/header.component';
  // import { CommonModule } from '@angular/common';
  // import { TasksComponent } from './components/tasks/tasks.component';
  // import { SidebarComponent } from './components/sidebar/sidebar.component';

  @Component({
    selector: 'app-root',
    standalone: true,
    imports: [
      RouterOutlet,
      CommonModule,
      MainLayoutComponent,
      MainLayoutComponent,
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
  })
  export class AppComponent {
    title = 'client';

    authService = inject(AuthService);

    constructor() {
      // this.authService.login({
      //   email: 'murat@gmail.com',
      //   password: '123456',
      // }).subscribe((r)=> {
      //   console.log('loguei', r)
      // })
    }
  }
