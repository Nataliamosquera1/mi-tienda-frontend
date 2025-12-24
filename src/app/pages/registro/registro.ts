import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [
    CommonModule,     // 🔥 NECESARIO
    FormsModule,
    RouterLink
  ],
  templateUrl: './registro.html',
  styleUrls: ['./registro.css']
})
export class Registro {

  nombre = '';
  apellidos = '';
  correo = '';
  contrasena = '';
  confirmarContrasena = '';
  codigo = '';
  error = '';
  cargando = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  registrar() {
    this.error = '';

    if (!this.nombre.trim() || !this.apellidos.trim() || !this.correo.trim() || !this.contrasena.trim()) {
      this.error = 'Debes completar todos los campos.';
      return;
    }

    if (this.contrasena !== this.confirmarContrasena) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    const payload = {
      nombre: `${this.nombre} ${this.apellidos}`,
      correo: this.correo,
      contrasena: this.contrasena,
      codigoAdmin: this.codigo   // 🔥 correcto para backend
    };

    this.cargando = true;

   this.authService.registro(payload).subscribe({
  next: () => {
    this.cargando = false;
    this.router.navigate(['/login']);
  },
  error: (err: any) => {   // ✅ AQUÍ
    this.cargando = false;

    if (err.status === 409) this.error = 'El correo ya está registrado.';
    else if (err.status === 0) this.error = 'No hay conexión con el servidor.';
    else this.error = 'Ocurrió un error inesperado.';
  }
});

  }
}
