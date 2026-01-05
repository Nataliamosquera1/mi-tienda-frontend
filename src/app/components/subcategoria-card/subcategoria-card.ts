import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subcategoria-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './subcategoria-card.html',
  styleUrls: ['./subcategoria-card.css']
})
export class SubcategoriaCard {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() descripcion!: string;
  @Input() categoriaId!: number;
  @Input() isAdmin: boolean = false;

  @Output() editSubcategoria = new EventEmitter<number>();
  @Output() toggleActive = new EventEmitter<number>();
  @Output() deleteSubcategoria = new EventEmitter<number>();
  @Output() viewProductos = new EventEmitter<number>();

  onEdit() {
    this.editSubcategoria.emit(this.id);
  }

  onToggleActive() {
    this.toggleActive.emit(this.id);
  }

  onDelete() {
    this.deleteSubcategoria.emit(this.id);
  }

  onViewProductos() {
    this.viewProductos.emit(this.id);
  }
}