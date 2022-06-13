import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RelTipo } from 'src/app/models/RelTipo';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RelTipoService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/rel-tipo';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerRelTipos(): Observable<RelTipo[]> {
    return this.http.get<RelTipo[]>(this.baseUrl + this.url);
  }

  obtenerRelTipo(id: number) : Observable<RelTipo> {
    return this.http.get<RelTipo>(this.baseUrl + this.url + '/' + id);
  }

  añadirRelTipo(relTipo: RelTipo) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_tipo: relTipo.id_tipo,
        id_animal: relTipo.id_animal,
      },
      this.requestOptions
    );
  }

  modificarRelTipo(relTipo: RelTipo) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_tipo: relTipo.id_tipo,
        id_animal: relTipo.id_animal,
      },
      this.requestOptions
    );
  }

  eliminarRelTipo(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
