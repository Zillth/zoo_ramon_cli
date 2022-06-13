import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { Cuidador } from '../../models/Cuidador';

@Injectable({
  providedIn: 'root',
})
export class CuidadorService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/cuidador';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerCuidadores(): Observable<Cuidador[]> {
    return this.http.get<Cuidador[]>(this.baseUrl + this.url);
  }

  obtenerCuidador(id: number) : Observable<Cuidador> {
    return this.http.get<Cuidador>(this.baseUrl + this.url + '/' + id);
  }

  añadirCuidador(cuidador: Cuidador) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_cuidador: cuidador.id_cuidador,
        rfc: cuidador.rfc,
        nombre_cuidador: cuidador.nombre_cuidador,
        telefono: cuidador.telefono,
      },
      this.requestOptions
    );
  }

  modificarCuidador(cuidador: Cuidador) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_cuidador: cuidador.id_cuidador,
        rfc: cuidador.rfc,
        nombre_cuidador: cuidador.nombre_cuidador,
        telefono: cuidador.telefono,
      },
      this.requestOptions
    );
  }

  eliminarCuidador(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
