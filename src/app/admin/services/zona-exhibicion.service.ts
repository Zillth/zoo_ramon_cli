import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { ZonaExhibicion } from 'src/app/models/ZonaExhibicion';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ZonaExhibicionService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/zona';
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerZonaExhibiciones(): Observable<ZonaExhibicion[]> {
    return this.http.get<ZonaExhibicion[]>(this.baseUrl + this.url);
  }

  obtenerZonaExhibicion(id: number) : Observable<ZonaExhibicion> {
    return this.http.get<ZonaExhibicion>(this.baseUrl + this.url + '/' + id);
  }

  añadirZonaExhibicion(zona: ZonaExhibicion) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_zona: zona.id_zona,
        nombre_zona: zona.nombre_zona,
        horario_zona: zona.horario_zona,
      },
      this.requestOptions
    );
  }

  modificarZonaExhibicion(zona: ZonaExhibicion) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_zona: zona.id_zona,
        nombre_zona: zona.nombre_zona,
        horario_zona: zona.horario_zona,
      },
      this.requestOptions
    );
  }

  eliminarZonaExhibicion(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
