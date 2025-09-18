import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
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
  credentials = { email: '', password: '', role: 'user' };
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  async onRegister() {
    try {
      await this.auth.register(this.credentials);
      // Após registro, navega para login
      this.router.navigateByUrl('/login');
    } catch (err) {
      this.errorMessage = 'Erro ao registrar usuário';
    }
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
