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
  @Input() precio: number = 0;
  @Input() cantidad: number = 0;

  @Output() agregar = new EventEmitter<any>();
  @Output() comprar = new EventEmitter<any>();

  agregarAlCarrito() {
    this.agregar.emit(this.producto);
  }

  comprarAhora() {
    this.comprar.emit(this.producto);
  }

  restar() {
    if (this.cantidad > 0) {
      this.cantidad--;
    }
  }

  sumar() {
    this.cantidad++;
  }
}
