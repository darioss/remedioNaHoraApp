import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService, User } from '../services/auth.service';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.currentUser$.pipe(
      map((user: User | null) => {
        if (!user) {
          return this.router.createUrlTree(['/login']);
        }

        // Admin: acesso a todos os módulos → redireciona para dashboard geral
        if (user.role === 'Admin') {
          return this.router.createUrlTree(['/modulo/dashboard']); 
        }

        // Outros roles: direciona para módulo específico
        switch (user.role) {
          case 'Cuidador':
            return this.router.createUrlTree(['/modulo/cuidador/dashboard']);
          case 'Farmacia':
            return this.router.createUrlTree(['/modulo/farmacia/home']);
          case 'Medico':
            return this.router.createUrlTree(['/modulo/medico/inbox']);
          case 'Paciente':
            return this.router.createUrlTree(['/modulo/paciente/welcome']);
          default:
            return this.router.createUrlTree(['/login']);
        }
      })
    );
  }
}
