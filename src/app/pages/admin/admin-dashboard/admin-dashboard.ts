import { Component } from '@angular/core';
import { AuthService } from '../../../core/services/auth';

@Component({
  standalone: true,
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {

  userName: string = '';

  totalProductos = 0;
  totalCategorias = 0;
  totalUsuarios = 0;
  totalFacturas = 0;

  constructor(private auth: AuthService) {
    const user = this.auth.getUser();
    this.userName = user?.nombre || 'Administrador';
  }

}
