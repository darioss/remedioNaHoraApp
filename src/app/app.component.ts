import { Component } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Router } from '@angular/router';
import { AuthService, User } from './services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule, NgIf, NgFor],
})
export class AppComponent {
  currentUser$: Observable<User | null>;
  appPages: { title: string; url: string; icon: string }[] = [];

  constructor(private auth: AuthService, private router: Router) {
    this.currentUser$ = this.auth.currentUser$;

    this.currentUser$.subscribe((user) => {
      if (!user) {
        this.appPages = [];
        return;
      }

      if (user.role.toLowerCase() === 'admin') {
        this.appPages = [
          { title: 'Cuidador', url: '/modulo/cuidador/dashboard', icon: 'people' },
          { title: 'Farmácia', url: '/modulo/farmacia/home', icon: 'medkit' },
          { title: 'Médico', url: '/modulo/medico/inbox', icon: 'person' },
          { title: 'Paciente', url: '/modulo/paciente/welcome', icon: 'heart' },
        ];
      } else {
        switch (user.role.toLowerCase()) {
          case 'cuidador':
            this.appPages = [{ title: 'Cuidador', url: '/modulo/cuidador/dashboard', icon: 'people' }];
            break;
          case 'farmacia':
            this.appPages = [{ title: 'Farmácia', url: '/modulo/farmacia/home', icon: 'medkit' }];
            break;
          case 'medico':
            this.appPages = [{ title: 'Médico', url: '/modulo/medico/inbox', icon: 'person' }];
            break;
          case 'paciente':
            this.appPages = [{ title: 'Paciente', url: '/modulo/paciente/welcome', icon: 'heart' }];
            break;
          default:
            this.appPages = [];
        }
      }
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}
