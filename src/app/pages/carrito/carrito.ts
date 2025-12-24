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
}
