import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../core/services/carrito';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito {

  productos: any[] = [];
  total = 0;
  isLogged = false;

  constructor(
    private carritoService: CarritoService,
    private router: Router,
    private auth: AuthService
  ) {
    // cargar productos almacenados
    this.productos = this.carritoService.getProductos();
    this.isLogged = this.auth.isLogged();
  }

  ngOnInit() {
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.productos.reduce(
      (acc, p) => acc + (p.precio * p.cantidad),
      0
    );
  }

  aumentarCantidad(p: any) {
    p.cantidad++;
    this.calcularTotal();
    this.carritoService.actualizarCarrito(this.productos);
  }

  disminuirCantidad(p: any) {
    if (p.cantidad > 1) {
      p.cantidad--;
    }
    this.calcularTotal();
    this.carritoService.actualizarCarrito(this.productos);
  }

  eliminarProducto(p: any) {
    this.productos = this.productos.filter(x => x.id !== p.id);
    this.calcularTotal();
    this.carritoService.actualizarCarrito(this.productos);
  }

  vaciarCarrito() {
    this.productos = [];
    this.total = 0;
    this.carritoService.limpiar();
  }

  // 👉 botón "Ver productos"
  irAProductos() {
    this.router.navigate(['/productos']);
  }

  pagar() {
    // Validaciones
    if (!this.isLogged) {
      Swal.fire({
        title: 'Inicia sesión',
        text: 'Debes iniciar sesión para realizar la compra.',
        icon: 'warning',
        confirmButtonText: 'Ir a login'
      }).then(() => this.router.navigate(['/login']));
      return;
    }

    if (this.productos.length === 0) {
      Swal.fire('Carrito vacío', 'Agrega productos antes de pagar.', 'warning');
      return;
    }

    if (this.total <= 0) {
      Swal.fire('Error', 'El total debe ser mayor a 0.', 'error');
      return;
    }

    // Validar stock (asumir que hay stock suficiente por ahora)
    // Aquí podrías llamar a un servicio para verificar stock

    // Confirmar orden
    Swal.fire({
      title: 'Confirmar compra',
      text: `Total: $${this.total}. ¿Confirmas la compra?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Enviar orden al backend
        this.enviarOrden();
      }
    });
  }

  enviarOrden() {
    // Preparar data de la orden
    const orden = {
      productos: this.productos,
      total: this.total,
      usuarioId: this.auth.getUser()?.id // Asumir que user tiene id
    };

    // Llamar a servicio (asumir CompraService)
    // this.compraService.crearCompra(orden).subscribe({
    //   next: () => {
    //     this.carritoService.limpiar();
    //     this.productos = [];
    //     this.total = 0;
    //     Swal.fire('Compra exitosa', 'Tu orden ha sido procesada.', 'success');
    //     this.router.navigate(['/']);
    //   },
    //   error: (err) => {
    //     Swal.fire('Error', 'No se pudo procesar la compra.', 'error');
    //   }
    // });

    // Por ahora, simular
    Swal.fire('Compra simulada', 'Orden enviada (conectar backend).', 'success');
    this.vaciarCarrito();
  }
}
