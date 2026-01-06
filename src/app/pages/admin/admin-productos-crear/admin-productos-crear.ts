import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductoService } from '../../../core/services/producto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-productos-crear',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-productos-crear.html',
  styleUrls: ['./admin-productos-crear.css']
})
export class AdminProductosCrearComponent {

  producto = {
    nombre: '',
    precio: 0,
    stock: 0,
    imagen: '',
    activo: true
  };

  constructor(private productoService: ProductoService, private router: Router) {}

  crearProducto() {
    this.productoService.crearProducto(this.producto).subscribe({
      next: () => this.router.navigate(['/admin/productos']),
      error: (err: any) => console.error('Error creating producto', err)
    });
  }
}