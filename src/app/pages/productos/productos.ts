import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { CarritoService } from '../../core/services/carrito';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoCard],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {

  productos = [
    { id: 1, nombre: 'Base líquida', precio: 20000, imagen: 'Bases.jpg' },
    { id: 2, nombre: 'Combo limpiador', precio: 55000, imagen: 'combos.jpg' },
    { id: 3, nombre: 'Jabón facial', precio: 15000, imagen: 'jabon.jpg' },
    { id: 4, nombre: 'Loción corporal', precio: 28000, imagen: 'locion.jpg' },
    { id: 5, nombre: 'Corrector de ojeras', precio: 220000, imagen: 'ojeras.jpg' },
    { id: 6, nombre: 'Pestañina', precio: 18000, imagen: 'Pestañina.jpg' },
    { id: 7, nombre: 'Sérum facial', precio: 32000, imagen: 'serum.jpg' },
    { id: 8, nombre: 'Spray fijador', precio: 20000, imagen: 'spray.jpg' }
  ];

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  addToCart(producto: any) {
    this.carritoService.agregarProducto(producto);
    console.log('Producto agregado:', producto);
  }

  buyNow(producto: any) {
    this.carritoService.agregarProducto(producto);
    this.router.navigate(['/carrito']);
  }
}
