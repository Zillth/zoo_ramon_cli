import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Distribucion } from 'src/app/models/Distribucion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DistribucionService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/distribucion';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerDistribuciones(): Observable<Distribucion[]> {
    return this.http.get<Distribucion[]>(this.baseUrl + this.url);
  }

  obtenerDistribucion(id: number) : Observable<Distribucion> {
    return this.http.get<Distribucion>(this.baseUrl + this.url + '/' + id);
  }

  añadirDistribucion(distribucion: Distribucion) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_distribucion: distribucion.id_distribucion,
        nombre_distribucion: distribucion.nombre_distribucion,
        descripcion_distribucion: distribucion.descripcion_distribucion,
      },
      this.requestOptions
    );
  }

  modificarDistribucion(distribucion: Distribucion) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_distribucion: distribucion.id_distribucion,
        nombre_distribucion: distribucion.nombre_distribucion,
        descripcion_distribucion: distribucion.descripcion_distribucion,
      },
      this.requestOptions
    );
  }

  eliminarDistribucion(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
