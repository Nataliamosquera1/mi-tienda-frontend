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
    { id: 1, nombre: 'Base líquida', precio: 20.0000, imagen: 'Bases.jpg' },
    { id: 2, nombre: 'Combo limpiador', precio: 55.000, imagen: 'combos.jpg' },
    { id: 3, nombre: 'Jabón facial', precio: 15.000, imagen: 'jabon.jpg' },
    { id: 4, nombre: 'Loción corporal', precio: 28.000, imagen: 'locion.jpg' },
    { id: 5, nombre: 'Corrector de ojeras', precio: 22.0000, imagen: 'ojeras.jpg' },
    { id: 6, nombre: 'Pestañina', precio: 18.000, imagen: 'Pestañina.jpg' },
    { id: 7, nombre: 'Sérum facial', precio: 32.000, imagen: 'serum.jpg' },
    { id: 8, nombre: 'Spray fijador', precio: 20.000, imagen: 'spray.jpg' }
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
