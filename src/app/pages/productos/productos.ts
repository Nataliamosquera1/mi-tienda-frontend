import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductoCard } from '../../components/producto-card/producto-card';
import { CarritoService } from '../../core/services/carrito';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ProductoCard],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  isAdmin = false;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private auth: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isAdmin = this.auth.isAdmin();

    // Capturamos la subcategoría desde queryParams
    this.route.queryParams.subscribe(params => {
      const subcategoriaId = +params['subcategoria']; // Convertir a número
      this.cargarProductos(subcategoriaId);
    });
  }

  cargarProductos(subcategoriaId?: number) {
    let productos = [
      { id: 1, nombre: 'Base líquida', precio: 50900, imagen: 'Bases.jpg', subcategoriaId: 2 },
      { id: 2, nombre: 'Combo limpiador', precio: 110900, imagen: 'combos.jpg', subcategoriaId: 3 },
      { id: 3, nombre: 'Gel de ducha', precio: 49900, imagen: 'jabon.jpg', subcategoriaId: 4 },
      { id: 4, nombre: 'Spray corporal', precio: 68900, imagen: 'locion.jpg', subcategoriaId: 10 },
      { id: 5, nombre: 'Corrector de ojeras', precio: 88900, imagen: 'ojeras.jpg', subcategoriaId: 1 },
      { id: 6, nombre: 'Pestañina', precio: 55400, imagen: 'Pestañina.jpg', subcategoriaId: 1 },
      { id: 7, nombre: 'Sérum facial', precio: 89900, imagen: 'serum.jpg', subcategoriaId: 6 },
      { id: 8, nombre: 'Spray corporal', precio: 68900, imagen: 'spray.jpg', subcategoriaId: 10 }
    ];

    if (subcategoriaId) {
      productos = productos.filter(p => p.subcategoriaId === subcategoriaId);
    }

    // Ruta completa usando public/
    this.productos = productos.map(p => ({ ...p, imagen: `/${p.imagen}` }));
  }

  addToCart(producto: any) {
    this.carritoService.agregarProducto(producto);
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

  buyNow(producto: any) {
    this.carritoService.agregarProducto(producto);
    this.router.navigate(['/carrito']);
  }

  agregarProducto() { this.router.navigate(['/admin/productos']); }
  editProduct(id: number) { alert('Editar producto ID: ' + id); }
  toggleActive(id: number) { alert('Toggle activo para ID: ' + id); }
  deleteProduct(id: number) { if(confirm('¿Eliminar producto?')) alert('Eliminar ID: ' + id); }

}
