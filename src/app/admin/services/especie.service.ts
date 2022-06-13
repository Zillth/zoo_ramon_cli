import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Especie } from 'src/app/models/Especie';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecieService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/especie';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerEspecies(): Observable<Especie[]> {
    return this.http.get<Especie[]>(this.baseUrl + this.url);
  }

  obtenerEspecie(id: number) : Observable<Especie> {
    return this.http.get<Especie>(this.baseUrl + this.url + '/' + id);
  }

  añadirEspecie(especie: Especie) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_especie: especie.id_especie,
        nombre_especie: especie.nombre_especie,
      },
      this.requestOptions
    );
  }

  modificarEspecie(especie: Especie) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_especie: especie.id_especie,
        nombre_especie: especie.nombre_especie,
      },
      this.requestOptions
    );
  }

  eliminarEspecie(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
