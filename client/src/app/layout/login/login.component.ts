import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  authService = inject(AuthService);
  router = inject(Router);

  login(event: Event) {
    event.preventDefault();
    this.isLoading = true;
    console.log(`Login ${this.email}/ ${this.password}`);
    this.authService
      .login({
        email: this.email,
        password: this.password,
      })
      .subscribe({
        next: () => {
          // alert('Login Sucecss!');
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
          alert('Erro no login, tente novamente!');
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
  }
}
