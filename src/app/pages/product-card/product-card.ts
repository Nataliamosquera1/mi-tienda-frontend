import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css']
})
export class ProductCard {

  @Input() producto: any;

  @Input() imagen: string = '';
  @Input() nombre: string = '';

  /** Precio original (sin descuento) */
  @Input() precio: number = 0;

  /** Precio anterior — se muestra tachado si viene */
  @Input() precioAnterior?: number;

  /** Descuento opcional (%) */
  @Input() descuento?: number;

  /** Cantidad seleccionada */
  @Input() cantidad: number = 0;

  @Output() agregar = new EventEmitter<any>();
  @Output() comprar = new EventEmitter<any>();


  get precioFinal(): number {
    // si viene precioNuevo desde promociones, úsalo
    if (this.precio && this.precioAnterior && this.precio < this.precioAnterior) {
      return this.precio;
    }

    // si viene descuento, lo calculamos
    if (this.descuento) {
      return Math.round(this.precio - (this.precio * (this.descuento / 100)));
    }

    // si no, se usa el precio normal
    return this.precio;
  }

  agregarAlCarrito() {
    this.agregar.emit(this.producto ?? {
      nombre: this.nombre,
      precio: this.precioFinal,
      cantidad: this.cantidad
    });
  }

  comprarAhora() {
    this.comprar.emit(this.producto ?? {
      nombre: this.nombre,
      precio: this.precioFinal,
      cantidad: this.cantidad
    });
  }

  restar() {
    if (this.cantidad > 0) this.cantidad--;
  }

  sumar() {
    this.cantidad++;
  }
}
