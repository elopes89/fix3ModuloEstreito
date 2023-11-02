import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IUsuario } from '../interfaces/IUsuario';
import { IAtendimento } from '../interfaces/IAtendimento';
import { IExercicio } from '../interfaces/IExercicio';
import { IAvaliacao } from '../interfaces/IAvaliacao';

@Injectable({
  providedIn: 'root'
})
export class DetalhamentoAlunoService {

  constructor(private httpClient: HttpClient) { }

  getAluno(id: number){
    return this.httpClient.get<IUsuario>(`${environment.apiBack}/api/usuarios/${id}`)
  }

  getAtendimentos(){
    return this.httpClient.get<IAtendimento[]>(`${environment.apiBack}/api/atendimentos`)
  }

  getExercicios(){
    return this.httpClient.get<IExercicio[]>(`${environment.apiBack}/api/exercicios`)
  }

  getAvaliacoes(){
    return this.httpClient.get<IAvaliacao[]>(`${environment.apiBack}/api/avaliacao`)
  }

  deleteAtendimento(id: number){
    return this.httpClient.delete(`${environment.apiBack}/api/atendimentos/${id}`)
  }

  deleteExercicio(id: number){
    return this.httpClient.delete(`${environment.apiBack}/api/exercicios/${id}`)
  }

  deleteAvaliacao(id: number){
    return this.httpClient.delete(`${environment.apiBack}/api/avaliacao/${id}`)
  }
}


