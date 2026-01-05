import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-card.html',
  styleUrls: ['./categoria-card.css']
})
export class CategoriaCard {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() imagen!: string;
  @Input() isAdmin: boolean = false;

  @Output() editCategoria = new EventEmitter<number>();
  @Output() toggleActive = new EventEmitter<number>();
  @Output() deleteCategoria = new EventEmitter<number>();
  @Output() viewSubcategorias = new EventEmitter<number>();

  onEdit() {
    this.editCategoria.emit(this.id);
  }

  onToggleActive() {
    this.toggleActive.emit(this.id);
  }

  onDelete() {
    this.deleteCategoria.emit(this.id);
  }

  onViewSubcategorias() {
    this.viewSubcategorias.emit(this.id);
  }
}