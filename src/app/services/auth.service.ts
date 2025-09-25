import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

export type UserRole = 'Admin' | 'Cuidador' | 'Farmacia' | 'Medico' | 'Paciente';

export interface User {
  email: string;
  username: string;
  role: UserRole;
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private readonly apiBase = 'https://dariosilva.net/cdg/api';

  constructor(private http: HttpClient) {}

  /** LOGIN */
  async login(credentials: { email: string; password: string }): Promise<User> {
    const resp = await firstValueFrom(
      this.http.post<{ token: string; user: { email: string; username: string; role: string } }>(
        `${this.apiBase}/login`,
        {
          email: credentials.email,
          password: credentials.password
        }
      )
    );

    if (!resp || !resp.user) {
      throw new Error('Resposta inválida do servidor');
    }

    const user: User = {
      email: resp.user.email,
      username: resp.user.username,
      role: resp.user.role as UserRole,
    };

    // Guarda token para chamadas futuras
    localStorage.setItem('opaqueToken', resp.token);

    this.currentUserSubject.next(user);
    return user;
  }

  /** LOGOUT */
  async logout(): Promise<void> {
    const token = localStorage.getItem('opaqueToken');
    if (token) {
      await firstValueFrom(
        this.http.post(`${this.apiBase}/logout`, {}, {
          headers: { Authorization: `Bearer ${token}` }
        })
      );
    }
    localStorage.removeItem('opaqueToken');
    this.currentUserSubject.next(null);
  }

  /** REGISTER */
  async register(data: { name: string; username: string; email: string; password: string; role: string }): Promise<User> {
    const resp = await firstValueFrom(
      this.http.post<{ token: string; user: { email: string; username: string; role: string } }>(
        `${this.apiBase}/register`,
        {
          name: data.name,
          username: data.username,
          email: data.email,
          password: data.password,
          password_confirmation: data.password,
          role: data.role
        }
      )
    );

    const user: User = {
      email: resp.user.email,
      username: resp.user.username,
      role: resp.user.role as UserRole,
    };

    localStorage.setItem('opaqueToken', resp.token);
    this.currentUserSubject.next(user);
    return user;
  }

  /** REFRESH TOKEN */
  async refreshToken(): Promise<string> {
    const token = localStorage.getItem('opaqueToken');
    if (!token) throw new Error('Nenhum token encontrado');

    const resp = await firstValueFrom(
      this.http.post<{ token: string }>(
        `${this.apiBase}/refresh`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
    );

    localStorage.setItem('opaqueToken', resp.token);
    return resp.token;
  }


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
