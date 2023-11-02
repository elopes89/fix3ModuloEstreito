import { Injectable, Inject } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CorsService {
  constructor() {}

  getCorsHeaders(): HttpHeaders {
    // Configurar os cabeçalhos CORS necessários aqui
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:4200/home', // Origem permitida

      // Outras configurações CORS, se necessário
    });
    return headers;
  }
}
