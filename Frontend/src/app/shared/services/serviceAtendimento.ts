import { IAtendimento } from './../interfaces/IAtendimento';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';
import { IUsuario } from '../interfaces/IUsuario';
import { CorsService } from 'src/app/shared/services/cors.service.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class serviceAtendimento {
  corsService: any;
  atendimentoForm!: FormGroup;

  constructor(private httpClient: HttpClient) { }

  obterAtendimento() {
    return this.httpClient.get<IAtendimento[]>('http://localhost:5009/api/atendimentos');
  }

  obterAtendimentoPorId(id: number): Observable<IAtendimento> {
    return this.httpClient.get<IAtendimento>(`http://localhost:5009/api/atendimentos/${id}`);
  }

  cadastrar(atendimento: Object): Observable<Object> {
    return this.httpClient.post<Object>('http://localhost:5009/api/atendimentos', atendimento);
  }

  editar(atendimento: Object, id: number): Observable<Object> {
    return this.httpClient.put<Object>(`http://localhost:5009/api/atendimentos/${id}`, atendimento)
  }
}
