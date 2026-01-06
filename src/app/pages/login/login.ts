import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  correo: string = '';
  contrasena: string = '';
  error: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  login(): void {
    const data = {
      correo: this.correo,
      contrasena: this.contrasena
    };

    this.authService.login(data).subscribe({
      next: (resp: any) => {
        console.log('RESPUESTA LOGIN:', resp);

        // 🔎 Validar respuesta
        if (!resp || !resp.rol) {
          this.error = 'Respuesta inválida del servidor';
          return;
        }

        // 🚦 Redirección por rol
        if (resp.rol === 'ROLE_ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/']);
        }
      },
      error: (err) => {
        this.error = 'Contraseña o correo incorrectos';
        console.error(err);
      }
    });
  }
}
