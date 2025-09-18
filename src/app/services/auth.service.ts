import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

export type UserRole = 'Admin' | 'Cuidador' | 'Farmacia' | 'Medico' | 'Paciente';

export interface User {
  email: string;
  role: UserRole;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();

  private readonly apiUrl = 'http://localhost:5079/api/Auth/login';

  constructor(private http: HttpClient) { }

  async login(credentials: { email: string; password: string }): Promise<User> {
    // Faz o POST
    const resp = await firstValueFrom(
      this.http.post<{ token: string; user: { username: string; role: string } }>(
        this.apiUrl,
        { username: credentials.email, password: credentials.password }
      )
    );

    if (!resp || !resp.user || !resp.user.username || !resp.user.role) {
      throw new Error('Resposta inválida do servidor');
    }

    const validRoles: UserRole[] = ['Admin', 'Cuidador', 'Farmacia', 'Medico', 'Paciente'];
    if (!validRoles.includes(resp.user.role as UserRole)) {
      throw new Error('Role inválido retornado pelo servidor');
    }

    const user: User = {
      email: resp.user.username, // username do backend → email no frontend
      role: resp.user.role as UserRole,
    };

    // Armazena o token se quiser usar futuramente
    localStorage.setItem('opaqueToken', resp.token);

    // Atualiza observable
    this.currentUserSubject.next(user);

    return user;
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('opaqueToken');
  }

  async register(data: { email: string; password: string; role?: string }): Promise<User> {
    console.log('Usuário registrado:', data);

    const user: User = {
      email: data.email,
      role: (data.role as User['role']) || 'user',
    };

    this.currentUserSubject.next(user);
    return user;
  }


  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
