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

    if (this.isBrowser) {
      const data = localStorage.getItem('carrito');
      this.productos = data ? JSON.parse(data) : [];
    }
  }

  getProductos() {
    return this.productos;
  }

  agregarProducto(producto: any) {
    const existente = this.productos.find(p => p.id === producto.id);

    if (existente) {
      existente.cantidad++;
    } else {
      this.productos.push({ ...producto, cantidad: 1 });
    }

    this.guardar();
  }

  limpiar() {
    this.productos = [];
    this.guardar();
  }

  private guardar() {
    if (this.isBrowser) {
      localStorage.setItem('carrito', JSON.stringify(this.productos));
    }
  }

  getCantidadTotal() {
    return this.productos.reduce((total, p) => total + p.cantidad, 0);
  }
}
