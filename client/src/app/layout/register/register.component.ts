import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  isLoading: boolean = false;

  private authService = inject(AuthService);
  private router = inject(Router);

  register() {
    this.isLoading = true;
    this.authService
      .register({ name: this.name, email: this.email, password: this.password })
      .subscribe(
        () => {
          this.isLoading = false;
          alert('Registration successful!');
          this.router.navigate(['/login']);
        },
        (error) => {
          this.isLoading = false;
          alert('Registration failed. Please try again.');
        }
      );
  }
}
