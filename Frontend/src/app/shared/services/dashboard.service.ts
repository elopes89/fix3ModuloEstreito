import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { environment } from 'src/environments/environment.development';
import { IExercicio } from '../interfaces/IExercicio';
import { IAvaliacao } from '../interfaces/IAvaliacao';
import { IAtendimento } from '../interfaces/IAtendimento';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private httpClient: HttpClient) { }

  getAlunos(){
    return this.httpClient.get<IUsuario[]>(`${environment.apiBack}/api/usuarios?empresaId=1&tipo=Aluno`)
  }

  getExercicios(){
    return this.httpClient.get<IExercicio[]>(`${environment.apiBack}/api/exercicios`)
  }

  getAvaliacoes(){
    return this.httpClient.get<IAvaliacao[]>(`${environment.apiBack}/api/avaliacao`)
  }

  getAtendimentos(){
    return this.httpClient.get<IAtendimento[]>(`${environment.apiBack}/api/atendimentos`)
  }

}
