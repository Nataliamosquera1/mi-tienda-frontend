import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  private productos: any[] = [];
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {

    this.isBrowser = isPlatformBrowser(platformId);

    // 🧠 Recuperar carrito persistente
    if (this.isBrowser) {
      const data = localStorage.getItem('carrito');
      this.productos = data ? JSON.parse(data) : [];
    }
  }

  // 👉 obtener lista del carrito
  getProductos() {
    return this.productos;
  }

  // 👉 agregar producto
  agregarProducto(producto: any) {

    // 🧠 Normalizar precio (funciona para promociones)
    const precio = producto.precioNuevo ?? producto.precio ?? 0;

    const item = {
      ...producto,
      precio,
      cantidad: producto.cantidad ?? 1
    };

    const existente = this.productos.find(p => p.id === item.id);

    if (existente) {
      existente.cantidad++;
    } else {
      this.productos.push(item);
    }

    this.guardar();
  }

  // 👉 actualizar carrito
  actualizarCarrito(productos: any[]) {
    this.productos = productos;
    this.guardar();
  }

  // 👉 eliminar seguro por id
  eliminarPorId(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    this.guardar();
  }

  // 👉 vaciar carrito
  limpiar() {
    this.productos = [];
    this.guardar();
  }

  // 👉 persistencia real
  private guardar() {
    if (this.isBrowser) {
      localStorage.setItem('carrito', JSON.stringify(this.productos));
    }
  }

  // 👉 cantidad de items para el header
  getCantidadTotal() {
    return this.productos.reduce((total, p) => total + p.cantidad, 0);
  }
}
