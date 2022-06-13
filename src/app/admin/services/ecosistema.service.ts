import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Ecosistema } from 'src/app/models/Ecosistema';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class EcosistemaService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/ecosistema';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerEcosistemas(): Observable<Ecosistema[]> {
    return this.http.get<Ecosistema[]>(this.baseUrl + this.url);
  }

  obtenerEcosistema(id: number) : Observable<Ecosistema> {
    return this.http.get<Ecosistema>(this.baseUrl + this.url + '/' + id);
  }

  añadirEcosistema(ecosistema: Ecosistema) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_ecosistema: ecosistema.id_ecosistema,
        nombre_ecosistema: ecosistema.nombre_ecosistema,
      },
      this.requestOptions
    );
  }

  modificarEcosistema(ecosistema: Ecosistema) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_ecosistema: ecosistema.id_ecosistema,
        nombre_ecosistema: ecosistema.nombre_ecosistema,
      },
      this.requestOptions
    );
  }

  eliminarEcosistema(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
