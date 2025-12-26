import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {

  productos: any[] = [];

  constructor(private carritoService: CarritoService) {
    this.productos = this.carritoService.getProductos();
  }
  total = 0;

ngOnInit() {
  this.calcularTotal();
}

calcularTotal() {
  this.total = this.productos
    .reduce((acc, p) => acc + (p.precio * p.cantidad), 0);
}

aumentarCantidad(p: any) {
  p.cantidad++;
  this.calcularTotal();
}

disminuirCantidad(p: any) {
  if (p.cantidad > 1) {
    p.cantidad--;
    this.calcularTotal();
  }
}

eliminarProducto(p: any) {
  this.productos = this.productos.filter(x => x !== p);
  this.calcularTotal();
}

}

