import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Tipo } from 'src/app/models/Tipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class TipoService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/tipo';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerTipos(): Observable<Tipo[]> {
    return this.http.get<Tipo[]>(this.baseUrl + this.url);
  }

  obtenerTipo(id: number) : Observable<Tipo> {
    return this.http.get<Tipo>(this.baseUrl + this.url + '/' + id);
  }

  añadirTipo(tipo: Tipo) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_tipo: tipo.id_tipo,
        nombre_tipo: tipo.nombre_tipo,
        descripcion_tipo: tipo.descripcion_tipo,
      },
      this.requestOptions
    );
  }

  modificarTipo(tipo: Tipo) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_tipo: tipo.id_tipo,
        nombre_tipo: tipo.nombre_tipo,
        descripcion_tipo: tipo.descripcion_tipo,
      },
      this.requestOptions
    );
  }

  eliminarTipo(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
