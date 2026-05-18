import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private apiUrl = environment.localUrl;

  register(data: { email: string; password: string; name?: string }) {
    return this.http.post(`${this.apiUrl}/users`, data);
  }

  login(data: { email: string; password: string }) {
    return this.http
      .get<any[]>(`${this.apiUrl}/users?email=${data.email}&password=${data.password}`)
      .pipe(
        tap((users) => {
          if (users.length > 0) {
            localStorage.setItem('user', JSON.stringify(users[0]));
            localStorage.setItem('token', 'fake-token-' + users[0].id);
          } else {
            throw new Error('Credenziali non valide');
          }
        })
      );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}