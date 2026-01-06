import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoService } from '../../../core/services/producto';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-productos',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-productos.html',
  styleUrls: ['./admin-productos.css']
})
export class AdminProductosComponent implements OnInit {

  productos: any[] = [];

  constructor(private productoService: ProductoService) {}

  ngOnInit() {
    this.loadProductos();
  }

  loadProductos() {
    this.productoService.getProductos().subscribe({
      next: (data: any[]) => this.productos = data,
      error: (err: any) => console.error('Error loading productos', err)
    });
  }

  toggleActivo(producto: any) {
    const updated = { ...producto, activo: !producto.activo };
    this.productoService.actualizarProducto(producto.id, updated).subscribe({
      next: () => this.loadProductos(),
      error: (err: any) => console.error('Error updating producto', err)
    });
  }

  editarProducto(producto: any) {
    // Navegar a una página de edición o abrir modal
    // Por ahora, alert
    alert('Editar producto: ' + producto.nombre);
  }

  eliminarProducto(producto: any) {
    if (confirm('¿Eliminar producto?')) {
      this.productoService.eliminarProducto(producto.id).subscribe({
        next: () => this.loadProductos(),
        error: (err: any) => console.error('Error deleting producto', err)
      });
    }
  }
}
