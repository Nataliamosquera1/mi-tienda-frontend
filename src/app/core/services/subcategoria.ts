import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaService {

  private apiUrl = 'http://localhost:8080/api/subcategorias';

  constructor(private http: HttpClient) {}

  getSubcategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  crearSubcategoria(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data);
  }

  actualizarSubcategoria(id: number, data: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, data);
  }

  eliminarSubcategoria(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
