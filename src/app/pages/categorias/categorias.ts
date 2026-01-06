import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaCard } from '../../components/categoria-card/categoria-card';
import { SubcategoriaCard } from '../../components/subcategoria-card/subcategoria-card';
import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, CategoriaCard, SubcategoriaCard],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {

  categorias = [
    { id: 1, nombre: 'Belleza', descripcion: 'Productos de cuidado personal', imagen: 'belleza.jpg', activo: true },
    { id: 2, nombre: 'Hogar', descripcion: 'Artículos para el hogar', imagen: 'hogar.jpg', activo: true }
  ];

  subcategorias: any[] = [];
  selectedCategoriaId: number | null = null;
  isAdmin = false;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
  }

  viewSubcategorias(categoriaId: number) {
    // Simular subcategorías
    this.subcategorias = [
      { id: 1, nombre: 'Maquillaje', descripcion: 'Productos de maquillaje', categoriaId, activo: true },
      { id: 2, nombre: 'Cuidado Facial', descripcion: 'Productos para la piel', categoriaId, activo: true }
    ];
    this.selectedCategoriaId = categoriaId;
  }

  editCategoria(id: number) {
    alert('Editar categoría ID: ' + id);
  }

  toggleActiveCategoria(id: number) {
    alert('Toggle activo categoría ID: ' + id);
  }

  deleteCategoria(id: number) {
    if (confirm('¿Eliminar categoría?')) {
      alert('Eliminar categoría ID: ' + id);
    }
  }

  editSubcategoria(id: number) {
    alert('Editar subcategoría ID: ' + id);
  }

  toggleActiveSubcategoria(id: number) {
    alert('Toggle activo subcategoría ID: ' + id);
  }

  deleteSubcategoria(id: number) {
    if (confirm('¿Eliminar subcategoría?')) {
      alert('Eliminar subcategoría ID: ' + id);
    }
  }

  viewProductos(subcategoriaId: number) {
    alert('Ver productos de subcategoría ID: ' + subcategoriaId);
  }

  agregarCategoria() {
    alert('Agregar nueva categoría');
  }
}
