import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/mainlayout/mainlayout.component';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './layout/login/login.component';
import { RegisterComponent } from './layout/register/register.component';

export const routes: Routes = [
  // { path: '**', redirectTo: '/home' }, // Redireciona qualquer rota não encontrada para '/home'
  // { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redireciona a rota raiz para '/home'
  { path: '', component: MainLayoutComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
