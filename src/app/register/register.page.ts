import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, User } from '../services/auth.service';
import {
  IonicModule,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonText,
} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule],
})
export class RegisterPage {
  credentials = {
    name: '',
    username: '',
    email: '',
    password: '',
    role: 'User', // default role
  };
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  async onRegister() {
    this.errorMessage = null;
    try {
      const user: User = await this.auth.register(this.credentials);
      console.log('Usuário registrado:', user);
      // Após registro, navega para login
      this.router.navigateByUrl('/login');
    } catch (err: any) {
      console.error(err);
      if (err?.error?.message) {
        this.errorMessage = err.error.message;
      } else {
        this.errorMessage = 'Erro ao registrar usuário';
      }
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
