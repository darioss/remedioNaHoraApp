import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { HttpRequest, HttpEvent, HttpInterceptorFn, HttpErrorResponse, HttpHandlerFn } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject, fromEvent, filter, take, firstValueFrom } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators'; // <- Import corrigido
import { AuthService, UserRole } from '../services/auth.service';
import { ToastController } from '@ionic/angular';

let isRefreshing = false;
let refreshTokenSubject = new BehaviorSubject<string | null>(null);

// Sincroniza logout entre abas
if (typeof window !== 'undefined') {
  fromEvent<StorageEvent>(window, 'storage').subscribe(event => {
    if (event.key === 'opaqueToken' && !event.newValue) {
      const router = inject(Router);
      const toastController = inject(ToastController);
      logout(router, toastController, 'Sua sessão expirou em outra aba.');
    }
  });
}

export const roleAwareAuthInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const toastController = inject(ToastController);

  const token = localStorage.getItem('opaqueToken');
  const authReq = token ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } }) : req;

  return next(authReq).pipe(
    catchError((error: any) => handleError(error, req, next, authService, router, toastController))
  );
};

function handleError(
  error: any,
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
  toastController: ToastController
): Observable<HttpEvent<any>> {

  if (error instanceof HttpErrorResponse) {

    if (error.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshTokenSubject.next(null);
        return fromRefresh(authService, next, req, router, toastController);
      } else {
        return refreshTokenSubject.pipe(
          filter((token: string | null) => token != null),
          take(1),
          switchMap((newToken: string | null) => {
            if (!newToken) return throwError(() => error);
            return next(req.clone({ setHeaders: { Authorization: newToken } }));
          })
        );
      }
    }

    if (error.status === 403) {
      logout(router, toastController, 'Acesso negado para o seu perfil.');
      return throwError(() => error);
    }
  }

  return throwError(() => error);
}

function fromRefresh(
  authService: AuthService,
  next: HttpHandlerFn,
  req: HttpRequest<any>,
  router: Router,
  toastController: ToastController
): Observable<HttpEvent<any>> {
  return new Observable(observer => {
    authService.refreshToken()
      .then(newToken => {
        isRefreshing = false;
        localStorage.setItem('opaqueToken', newToken);
        refreshTokenSubject.next(newToken);

        const role = authService.getCurrentUser()?.role;
        if (role) showRoleToast(toastController, role, 'Sessão renovada com sucesso.');

        firstValueFrom(next(req.clone({ setHeaders: { Authorization: newToken } })))
          .then(res => { observer.next(res); observer.complete(); })
          .catch(err => observer.error(err));
      })
      .catch(async err => {
        isRefreshing = false;
        const role = authService.getCurrentUser()?.role;
        await showRoleToast(toastController, role, 'Sua sessão expirou. Faça login novamente.');
        logout(router, toastController);
        observer.error(err);
      });
  });
}

async function logout(router: Router, toastController?: ToastController, message?: string) {
  localStorage.removeItem('opaqueToken');
  if (toastController && message) {
    const toast = await toastController.create({ message, duration: 4000, color: 'warning', position: 'top' });
    toast.present();
  }
  router.navigate(['/login']);
}

async function showRoleToast(toastController: ToastController, role: UserRole | undefined, message: string) {
  if (!role) return;
  let roleMessage = '';
  switch (role) {
    case 'Admin': roleMessage = '👑 Admin'; break;
    case 'Cuidador': roleMessage = '🧑‍⚕️ Cuidador'; break;
    case 'Farmacia': roleMessage = '💊 Farmácia'; break;
    case 'Medico': roleMessage = '🩺 Médico'; break;
    case 'Paciente': roleMessage = '🙂 Paciente'; break;
  }
  const toast = await toastController.create({ message: `${roleMessage}: ${message}`, duration: 4000, color: 'success', position: 'top' });
  toast.present();
}
