import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriaCard } from '../../components/categoria-card/categoria-card';
import { SubcategoriaCard } from '../../components/subcategoria-card/subcategoria-card';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, CategoriaCard, SubcategoriaCard],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class Categorias implements OnInit {

  categorias = [
    {
      id: 1,
      nombre: 'Maquillaje',
      descripcion: 'Bases, labiales, polvos, sombras y más',
      imagen: 'Bases.jpg',
      activo: true
    },
    {
      id: 2,
      nombre: 'Cuidado Facial',
      descripcion: 'Limpieza facial, serums, cremas hidratantes',
      imagen: 'jabon.jpg',
      activo: true
    },
    {
      id: 3,
      nombre: 'Cabello',
      descripcion: 'Shampoo, tratamientos y cuidado capilar',
      imagen: 'combos.jpg',
      activo: true
    },
    {
      id: 4,
      nombre: 'Perfumería',
      descripcion: 'Fragancias femeninas y corporales',
      imagen: 'locion.jpg',
      activo: true
    }
  ];

  subcategorias: any[] = [];
  selectedCategoriaId: number | null = null;

  isAdmin = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();
  }

  // =============================
  // SUBCATEGORÍAS POR CATEGORÍA
  // =============================
  viewSubcategorias(categoriaId: number) {

    switch (categoriaId) {

      case 1:
        this.subcategorias = [
          { id: 1, nombre: 'Labiales', descripcion: 'Larga duración', categoriaId, activo: true },
          { id: 2, nombre: 'Bases', descripcion: 'Alta cobertura', categoriaId, activo: true },
          { id: 3, nombre: 'Sombras', descripcion: 'Paletas y tonos variados', categoriaId, activo: true }
        ];
        break;

      case 2:
        this.subcategorias = [
          { id: 4, nombre: 'Limpieza facial', descripcion: 'Espumas y geles', categoriaId, activo: true },
          { id: 5, nombre: 'Cremas hidratantes', descripcion: 'Piel saludable', categoriaId, activo: true },
          { id: 6, nombre: 'Serums', descripcion: 'Tratamientos concentrados', categoriaId, activo: true }
        ];
        break;

      case 3:
        this.subcategorias = [
          { id: 7, nombre: 'Shampoo', descripcion: 'Nutrición y brillo', categoriaId, activo: true },
          { id: 8, nombre: 'Tratamientos capilares', descripcion: 'Keratina, ampollas', categoriaId, activo: true }
        ];
        break;

      case 4:
        this.subcategorias = [
          { id: 9, nombre: 'Perfumes femeninos', descripcion: 'Esencias suaves y dulces', categoriaId, activo: true },
          { id: 10, nombre: 'Splash corporales', descripcion: 'Aromas frescos', categoriaId, activo: true }
        ];
        break;
    }

    this.selectedCategoriaId = categoriaId;
  }

  // =============================
  // ACCIONES ADMIN
  // =============================

  agregarCategoria() {
    alert('Agregar nueva categoría');
  }

  editCategoria(id: number) {
    alert('Editar categoría ID: ' + id);
  }

  toggleActiveCategoria(id: number) {
    alert('Activar / Desactivar categoría ID: ' + id);
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
    alert('Activar / Desactivar subcategoría ID: ' + id);
  }

  deleteSubcategoria(id: number) {
    if (confirm('¿Eliminar subcategoría?')) {
      alert('Eliminar subcategoría ID: ' + id);
    }
  }

  // =============================
  // 🚀 ENVIAR SUBCATEGORÍA A PRODUCTOS
  // =============================
  viewProductos(subcategoriaId: number) {

    console.log("Subcategoría seleccionada:", subcategoriaId);

    this.router.navigate(
      ['/productos'],
      {
        queryParams: {
          subcategoria: subcategoriaId
        }
      }
    );
  }

}
