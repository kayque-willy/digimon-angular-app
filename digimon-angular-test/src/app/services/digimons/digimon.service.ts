import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { take } from "rxjs";
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Digimon } from 'src/app/models/digimon';


@Injectable({
  //O atributo providedIn define onde o serviço pode ser utilizado na aplicação.
  //Caso não seja definido, é necessário adiconar os serviços no campo Providers dos módulos
  providedIn: 'root'
})
export class DigimonService {

  private readonly API: string = environment.api;
  protected typeName: string = 'digimon';

  constructor(
    public httpClient: HttpClient
  ) { }

  // Recupera todas as entidades
  // https://digimon-api.vercel.app/api/digimon
  public getAll() {
    return this.httpClient
      .get<Digimon[]>(`${this.API}/${this.typeName}/`)
      .pipe(take(1));
  }

  // Recupera todas as entidades pelo tipo
  // https://digimon-api.vercel.app/api/digimon/level/:level
  public getByLevel(level: string) {
    return this.httpClient
      .get<Digimon[]>(`${this.API}/${this.typeName}/level/${level}`)
      .pipe(take(1));
  }

  // Recupera a entidade pelo nome
  // https://digimon-api.vercel.app/api/digimon/name/:name	
  public getByName(name: string) {
    return this.httpClient
      .get<Digimon[]>(`${this.API}/${this.typeName}/name/${name}`)
      .pipe(
        take(1),
        catchError(err => {
          return throwError(() => err);
        }),
      );
  }
}
