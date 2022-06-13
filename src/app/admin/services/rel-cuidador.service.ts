import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { RelCuidador } from 'src/app/models/RelCuidador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RelCuidadorService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/rel-cuidador';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerRelCuidadores(): Observable<RelCuidador[]> {
    return this.http.get<RelCuidador[]>(this.baseUrl + this.url);
  }

  obtenerRelCuidador(id: number) : Observable<RelCuidador> {
    return this.http.get<RelCuidador>(this.baseUrl + this.url + '/' + id);
  }

  añadirRelCuidador(relCuidador: RelCuidador) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_cuidador: relCuidador.id_cuidador,
        id_animal: relCuidador.id_animal,
        horario_cuida: relCuidador.horario_cuida,
      },
      this.requestOptions
    );
  }

  modificarRelCuidador(relCuidador: RelCuidador) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_cuidador: relCuidador.id_cuidador,
        id_animal: relCuidador.id_animal,
        horario_cuida: relCuidador.horario_cuida,
      },
      this.requestOptions
    );
  }

  eliminarRelCuidador(id: number, id2: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id + '/' + id2,
      this.requestOptions
    );
  }
}
