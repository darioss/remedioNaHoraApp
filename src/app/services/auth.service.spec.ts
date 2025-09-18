import { Injectable } from '@angular/core';

interface User {
  email: string;
  role: 'admin' | 'manager' | 'user' | 'guest';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser: User | null = null;

  async login(credentials: { email: string; password: string }): Promise<User> {
    // Aqui chamaria sua API real (via HttpClient)
    // Exemplo mockado:
    if (credentials.email === 'admin@teste.com') {
      this.currentUser = { email: credentials.email, role: 'admin' };
    } else if (credentials.email === 'manager@teste.com') {
      this.currentUser = { email: credentials.email, role: 'manager' };
    } else {
      this.currentUser = { email: credentials.email, role: 'user' };
    }

    return this.currentUser;
  }

  getCurrentUser() {
    return this.currentUser;
  }

  logout() {
    this.currentUser = null;
  }
}
