import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { IonicModule } from '@ionic/angular'; 


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonicModule 
  ],
})
export class LoginPage {
  credentials = { email: '', password: '' };
  errorMessage: string | null = null;

  constructor(private auth: AuthService, private router: Router) {}

  async onLogin() {
    try {
      const user = await this.auth.login(this.credentials);
      if (user) {
        // 🔥 Agora não decide mais rota por role
        // Apenas navega para uma rota protegida qualquer
        this.router.navigateByUrl('/page/home');
      }
    } catch (err) {
      this.errorMessage = 'Credenciais inválidas';
    }
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
