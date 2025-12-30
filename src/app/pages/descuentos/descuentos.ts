import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../core/services/carrito';
import { ProductCard } from '../product-card/product-card';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-descuentos',
  standalone: true,
  imports: [CommonModule, ProductCard],
  templateUrl: './descuentos.html',
  styleUrls: ['./descuentos.css']
})
export class Descuentos {

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  promociones = [
    {
      id: 9,
      nombre: 'Diadema elegante',
      descripcion: 'Diadema acolchada con diseño delicado, ideal para complementar tu look diario.',
      imagen: 'diadema.jpg',
      precioAnterior: 18000,
      precioNuevo: 12000,
      descuento: 33
    },
    {
      id: 10,
      nombre: 'Gloss labial hidratante',
      descripcion: 'Gloss de textura ligera con acabado brillante que hidrata y realza el color natural de los labios.',
      imagen: 'gloss.jpg',
      precioAnterior: 22000,
      precioNuevo: 15000,
      descuento: 32
    },
    {
      id: 11,
      nombre: 'Llavero Stitch rosa',
      descripcion: 'Llavero inspirado en Stitch con diseño tierno y acabado brillante, ideal para llaves, bolsos o mochilas.',
      imagen: 'llavero lila.jpg',
      precioAnterior: 12000,
      precioNuevo: 8000,
      descuento: 35
    },
    {
      id: 12,
      nombre: 'Llavero panda peludo',
      descripcion: 'Llavero suave con diseño de panda peludo, perfecto para bolsos, mochilas o llaves con estilo tierno.',
      imagen: 'llavero panda.jpg',
      precioAnterior: 16000,
      precioNuevo: 11000,
      descuento: 31
    },
    {
      id: 13,
      nombre: 'Llavero Stitch',
      descripcion: 'Llavero inspirado en Stitch, perfecto para llaves, bolsos o mochilas con estilo divertido.',
      imagen: 'llavero stick.jpg',
      precioAnterior: 18000,
      precioNuevo: 12000,
      descuento: 33
    },
    {
      id: 14,
      nombre: 'Tinta labial de larga duración',
      descripcion: 'Tinta labial ligera con acabado natural y color de larga duración que mantiene los labios suaves e hidratados.',
      imagen: 'tendencia.jpg',
      precioAnterior: 28000,
      precioNuevo: 19000,
      descuento: 32
    },
    {
      id: 15,
      nombre: 'Vaso Stanley térmico premium',
      descripcion: 'Vaso térmico de acero inoxidable que mantiene tus bebidas frías o calientes por varias horas. Ideal para uso diario y viajes.',
      imagen: 'termo.jpg',
      precioAnterior: 95000,
      precioNuevo: 72000,
      descuento: 24
    },
    {
      id: 16,
      nombre: 'Rubor líquido efecto natural',
      descripcion: 'Rubor líquido de larga duración con acabado suave y natural. Fácil de difuminar y perfecto para un look fresco.',
      imagen: 'gloss-1.jpg',
      precioAnterior: 28000,
      precioNuevo: 19500,
      descuento: 30
    }
  ];

  addToCart(p: any) {
    const producto = {
      ...p,
      precio: p.precioNuevo ?? p.precio ?? 0,
      cantidad: 1
    };

    this.carritoService.agregarProducto(producto);
    console.log('Producto agregado desde promociones:', producto);

    // 🔥 ALERTA SWEETALERT
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
    });
  }

  buyNow(p: any) {
    const producto = {
      ...p,
      precio: p.precioNuevo ?? p.precio ?? 0,
      cantidad: 1
    };

    this.carritoService.agregarProducto(producto);
    this.router.navigate(['/carrito']);
  }
}
