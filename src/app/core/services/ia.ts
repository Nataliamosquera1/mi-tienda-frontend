import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IAService {

  private apiUrl = 'http://localhost:8080/api/ia/descripcion';

  constructor(private http: HttpClient) {}

  generarDescripcion(data: any): Observable<any> {
    return this.http.post(this.apiUrl, data, { responseType: 'text' });
  }
}
