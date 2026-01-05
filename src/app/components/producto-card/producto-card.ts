
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; // 👈 necesario para [(ngModel)]


@Component({
  selector: 'app-producto-card',
  standalone: true,
  imports: [CommonModule, FormsModule], // 👈 incluye FormsModule
  templateUrl: './producto-card.html',
  styleUrls: ['./producto-card.css'],
})
export class ProductoCard {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() precio!: number;   // número → pipe currency
  @Input() imagen!: string;   // ruta assets/img/...
  @Input() descuento?: number;
  @Input() isAdmin: boolean = false;

  // Cantidad controlada por [(ngModel)]
  cantidad = 1;

  @Output() addToCart = new EventEmitter<{ id:number; nombre:string; precio:number; imagen:string; cantidad:number }>();
  @Output() buyNow    = new EventEmitter<{ id:number; nombre:string; precio:number; imagen:string; cantidad:number }>();
  @Output() editProduct = new EventEmitter<number>();
  @Output() toggleActive = new EventEmitter<number>();
  @Output() deleteProduct = new EventEmitter<number>();

  inc(){ this.cantidad = Math.min(this.cantidad + 1, 99); }
  dec(){ this.cantidad = Math.max(this.cantidad - 1, 1); }

  onAdd(){
    this.addToCart.emit({
      id: this.id, nombre: this.nombre, precio: this.precio, imagen: this.imagen, cantidad: this.cantidad
    });
  }
  onBuy(){
    this.buyNow.emit({
      id: this.id, nombre: this.nombre, precio: this.precio, imagen: this.imagen, cantidad: this.cantidad
    });
  }

  onEdit() {
    this.editProduct.emit(this.id);
  }

  onToggleActive() {
    this.toggleActive.emit(this.id);
  }

  onDelete() {
    this.deleteProduct.emit(this.id);
  }
}
