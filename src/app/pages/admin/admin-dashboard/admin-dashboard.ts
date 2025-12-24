import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>Panel de Administración</h1>
    <p>Bienvenido, administrador</p>
  `,
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboard {
  totalProductos = 45;
  totalCategorias = 6;
  totalUsuarios = 12;
  totalFacturas = 20;
}

