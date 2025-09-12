import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'page/folder/inbox',
    pathMatch: 'full',
  },
  {
    path: 'page/:modulo/:pagina',
    loadComponent: () =>
      import('./folder/folder.page').then((m) => m.FolderPage),
  },
];
