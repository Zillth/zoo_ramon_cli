import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RelDistribucion } from 'src/app/models/RelDistribucion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelDistribucionService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/rel-distribucion';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerRelDistribuciones(): Observable<RelDistribucion[]> {
    return this.http.get<RelDistribucion[]>(this.baseUrl + this.url);
  }

  obtenerRelDistribucion(id: number) : Observable<RelDistribucion> {
    return this.http.get<RelDistribucion>(this.baseUrl + this.url + '/' + id);
  }

  añadirRelDistribucion(relDistribucion: RelDistribucion) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_distribucion: relDistribucion.id_distribucion,
        id_animal: relDistribucion.id_animal,
      },
      this.requestOptions
    );
  }

  modificarRelDistribucion(relDistribucion: RelDistribucion) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_distribucion: relDistribucion.id_distribucion,
        id_animal: relDistribucion.id_animal,
      },
      this.requestOptions
    );
  }

  eliminarRelDistribucion(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
