import { Routes } from '@angular/router';
import { AuthGuard } from './guards/auth-guard';

export const routes: Routes = [
  // Rota raiz → redireciona para login
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },

  // Login e Register (acessíveis sem autenticação)
  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.page').then(m => m.LoginPage),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.page').then(m => m.RegisterPage),
  },

  // Dashboard Admin (apenas admin)
  {
    path: 'modulo/dashboard',
    loadComponent: () =>
      import('./modulo/admin/dashboard/dashboard.page').then(m => m.DashboardPage),
    canActivate: [AuthGuard],
  },

  // Rotas dos módulos específicos (protegidas pelo AuthGuard)
  {
    path: 'page/:modulo/:pagina',
    loadComponent: () =>
      import('./modulo/modulo.page').then(m => m.ModuloPage),
    canActivate: [AuthGuard],
  },

  // Rotas extras dos módulos (opcional: você pode adicionar caminhos específicos)
  {
    path: 'modulo/cuidador/dashboard',
    loadComponent: () =>
      import('./modulo/cuidador/cuidador.page').then(m => m.CuidadorPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'modulo/farmacia/home',
    loadComponent: () =>
      import('./modulo/farmacia/farmacia.page').then(m => m.FarmaciaPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'modulo/medico/inbox',
    loadComponent: () =>
      import('./modulo/medico/medico.page').then(m => m.MedicoPage),
    canActivate: [AuthGuard],
  },
  {
    path: 'modulo/paciente/welcome',
    loadComponent: () =>
      import('./modulo/paciente/paciente.page').then(m => m.PacientePage),
    canActivate: [AuthGuard],
  },
];
