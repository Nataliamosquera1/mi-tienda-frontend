import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { CarritoService } from '../../core/services/carrito';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoCard],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent {

  productos = [
    { id: 1, nombre: 'Base líquida', precio: 50900, imagen: 'Bases.jpg' },
    { id: 2, nombre: 'Combo limpiador', precio: 110900, imagen: 'combos.jpg' },
    { id: 3, nombre: 'Gel de ducha', precio: 49900, imagen: 'jabon.jpg' },
    { id: 4, nombre: 'Spray corporal', precio: 68900, imagen: 'locion.jpg' },
    { id: 5, nombre: 'Corrector de ojeras', precio: 88900, imagen: 'ojeras.jpg' },
    { id: 6, nombre: 'Pestañina', precio: 55400, imagen: 'Pestañina.jpg' },
    { id: 7, nombre: 'Sérum facial', precio: 89900, imagen: 'serum.jpg' },
    { id: 8, nombre: 'Spray corporal', precio: 68900, imagen: 'spray.jpg' }
  ];

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  addToCart(producto: any) {
    this.carritoService.agregarProducto(producto);
    console.log('Producto agregado:', producto);

    // 🔥 ALERTA DE SWEETALERT
    Swal.fire({
      title: 'Producto agregado 🛒',
      text: 'El artículo fue añadido correctamente al carrito',
      icon: 'success',
      draggable: true,
      background: '#fff7fb',
      confirmButtonText: 'Seguir comprando',
      confirmButtonColor: '#ff80b5',
      showCancelButton: true,
      cancelButtonText: 'Ir al carrito',
      cancelButtonColor: '#888'
    }).then(res => {
      if (res.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/carrito']);
      }
      // Si confirma "Seguir comprando", simplemente se cierra la alerta
    });
  }

  buyNow(producto: any) {
    this.carritoService.agregarProducto(producto);
    this.router.navigate(['/carrito']);
  }
}
