import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Animal } from 'src/app/models/Animal';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AnimalService {
  private baseUrl: string = environment.baseUrl;
  private url: string = '/animal'
  private requestOptions: Object = {
    responseType: 'text',
    headers: new HttpHeaders()
      .set('Access-Control-Allow-Origin', this.baseUrl)
      .set('Authorization', `${this.authService.getToken()}`),
  };

  constructor(private authService: AuthService, private http: HttpClient) {}

  obtenerAnimales(): Observable<Animal[]> {
    return this.http.get<Animal[]>(this.baseUrl + this.url);
  }

  obtenerAnimal(id: number) : Observable<Animal> {
    return this.http.get<Animal>(this.baseUrl + this.url + '/' + id);
  }

  añadirAnimal(animal: Animal) {
    return this.http.post<string>(
      this.baseUrl + this.url,
      {
        id_animal: animal.id_animal,
        nombre_animal: animal.nombre_animal,
        e_conservacion: animal.e_conservacion,
        dieta: animal.dieta,
        reproduccion: animal.reproduccion,
        adaptacion: animal.adaptacion,
        amenazas: animal.amenazas,
        id_especie: animal.id_especie,
        id_zona: animal.id_zona,
        id_ecosistema: animal.id_ecosistema,
      },
      this.requestOptions
    );
  }

  modificarAnimal (animal: Animal) {
    return this.http.put<string>(
      this.baseUrl + this.url,
      {
        id_animal: animal.id_animal,
        nombre_animal: animal.nombre_animal,
        e_conservacion: animal.e_conservacion,
        dieta: animal.dieta,
        reproduccion: animal.reproduccion,
        adaptacion: animal.adaptacion,
        amenazas: animal.amenazas,
        id_especie: animal.id_especie,
        id_zona: animal.id_zona,
        id_ecosistema: animal.id_ecosistema,
      },
      this.requestOptions
    );
  }

  eliminarAnimal(id: number) {
    return this.http.delete<string>(
      this.baseUrl + this.url + '/' + id,
      this.requestOptions
    );
  }
}
