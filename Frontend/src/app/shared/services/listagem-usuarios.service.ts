import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUsuario } from '../interfaces/IUsuario';
import { environment } from 'src/environments/environment.development';
import { IAtendimento } from '../interfaces/IAtendimento';

@Injectable({
  providedIn: 'root'
})
export class ListagemUsuariosService {

  constructor(private httpClient: HttpClient) { }

  getUsuarios(){
    return this.httpClient.get<IUsuario[]>(`${environment.apiBack}/api/usuarios?empresaId=1`)
  }

  getAlunos(){
    return this.httpClient.get<IUsuario[]>(`${environment.apiBack}/api/usuarios?empresaId=1&tipo=Aluno`)
  }

  getAtendimentoId(id: number){
    return this.httpClient.get<IAtendimento>(`${environment.apiBack}/api/atendimentos/${id}`)
  }

  updateAtendimento(id: number, data: IAtendimento){
    return this.httpClient.put(`${environment.apiBack}/api/atendimentos/${id}`, data)
  }

  getPedagogos(){
    return this.httpClient.get<IUsuario[]>(`${environment.apiBack}/api/usuarios?empresaId=1&tipo=Pedagogo`)
  }

  postPedagogo(novoPedagogo: IAtendimento){
    return this.httpClient.post(`${environment.apiBack}/api/atendimentos`, novoPedagogo)
  }

  deleteUsuario(id: number){
    return this.httpClient.delete(`${environment.apiBack}/api/usuarios/${id}`)
  }
}
