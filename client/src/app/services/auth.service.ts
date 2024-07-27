import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private JWT_TOKEN = 'JWT_TOKEN';
  private USER_PAYLOAD = 'USER_PAYLOAD';
  private loggedUser?: string;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private apiUrl = environment.apiUrl;

  private httpClient = inject(HttpClient);
  private router = inject(Router);
  constructor() {}

  login(user: { email: string; password: string }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/auth/login`, user).pipe(
      tap((response: any) => {
        console.log('Login response:', response);
        this.doLoginUser(response.payload, response.token);
      })
    );
  }

  register(user: {
    name: string;
    email: string;
    password: string;
  }): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/users`, user);
  }

  private doLoginUser(user: UserPayload, token: string) {
    this.loggedUser = user.email;
    this.storeJwtToken(token);
    this.storeUserPayload(user);
    this.isAuthenticatedSubject.next(true);
  }

  private storeJwtToken(jwt: string) {
    console.log('Saving JWT:', jwt);
    localStorage.setItem(this.JWT_TOKEN, jwt);
  }

  private storeUserPayload(user: UserPayload) {
    const userPayloadString = JSON.stringify(user);
    localStorage.setItem(this.USER_PAYLOAD, userPayloadString);
  }

  getUser(): UserPayload | null {
    const userPayloadString = localStorage.getItem(this.USER_PAYLOAD);
    return userPayloadString ? JSON.parse(userPayloadString) : null;
  }

  getToken(): string | null {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  logout() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.USER_PAYLOAD);
    this.isAuthenticatedSubject.next(false);
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return !!localStorage.getItem(this.JWT_TOKEN);
  }
}
