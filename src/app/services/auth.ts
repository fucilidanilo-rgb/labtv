
import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  id: number;
  nome: string;
  email: string;
  token: string;
}

interface UtenteResponse {
  id: number;
  nome: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/api/auth';

  register(data: {
    email: string;
    password: string;
    name?: string;
    nome?: string;
  }) {
    return this.http.post<UtenteResponse>(
      `${this.apiUrl}/register`,
      {
        nome: data.nome ?? data.name,
        email: data.email,
        password: data.password
      }
    );
  }

  login(data: { email: string; password: string }) {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      data
    ).pipe(
      tap((response) => {

        const user = {
          id: response.id,
          nome: response.nome,
          name: response.nome,
          email: response.email
        };

        localStorage.setItem('user', JSON.stringify(user));

        localStorage.setItem('token', response.token);
      })
    );
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
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
