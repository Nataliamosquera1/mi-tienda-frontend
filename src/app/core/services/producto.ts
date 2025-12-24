import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private apiUrl = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getProductoById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  crearProducto(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  actualizarProducto(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
