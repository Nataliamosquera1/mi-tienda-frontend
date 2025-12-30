import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {

  productos: any[] = [];
  total = 0;

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {
    // cargar productos almacenados
    this.productos = this.carritoService.getProductos();
  }

  ngOnInit() {
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.productos.reduce(
      (acc, p) => acc + (p.precio * p.cantidad),
      0
    );
  }

  aumentarCantidad(p: any) {
    p.cantidad++;
    this.calcularTotal();
    this.carritoService.actualizarCarrito(this.productos);
  }

  disminuirCantidad(p: any) {
    if (p.cantidad > 1) {
      p.cantidad--;
    }
    this.calcularTotal();
    this.carritoService.actualizarCarrito(this.productos);
  }

  eliminarProducto(p: any) {
    this.productos = this.productos.filter(x => x.id !== p.id);
    this.calcularTotal();
    this.carritoService.actualizarCarrito(this.productos);
  }

  vaciarCarrito() {
    this.productos = [];
    this.total = 0;
    this.carritoService.limpiar();
  }

  // 👉 botón "Ver productos"
  irAProductos() {
    this.router.navigate(['/productos']);
  }

}
