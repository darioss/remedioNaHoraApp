import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, RouterModule],
})
export class DashboardPage {
  modules = [
    { name: 'Cuidador', path: '/modulo/cuidador/dashboard', icon: 'people' },
    { name: 'Farmácia', path: '/modulo/farmacia/home', icon: 'medkit' },
    { name: 'Médico', path: '/modulo/medico/inbox', icon: 'person' },
    { name: 'Paciente', path: '/modulo/paciente/welcome', icon: 'heart' },
  ];

  constructor(private router: Router) {}

  goToModule(path: string) {
    this.router.navigateByUrl(path);
  }
}
