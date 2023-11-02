import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IExercicio } from '../interfaces/IExercicio';
import { IUsuario } from '../interfaces/IUsuario';

@Injectable({
  providedIn: 'root'
})
export class ExercicioService {

  constructor(private httpClient: HttpClient) { }

  getExercicios(){
    return this.httpClient.get<IExercicio[]>(`${environment.apiBack}/api/exercicios`)
  }

  getExercicio(id: number){
    return this.httpClient.get<IExercicio>(`${environment.apiBack}/api/exercicios/${id}`)
  }

  deleteExercicio(id: number){
    return this.httpClient.delete(`${environment.apiBack}/api/exercicios/${id}`)
  }

  getAlunos(){
    return this.httpClient.get<IUsuario[]>(`${environment.apiBack}/api/usuarios?empresaId=1&tipo=Aluno`)
  }

  getProfessores(){
    return this.httpClient.get<IUsuario[]>(`${environment.apiBack}/api/usuarios?empresaId=1&tipo=Professor`)
  }

  postExercicio(novoExercicio: IExercicio){
    return this.httpClient.post(`${environment.apiBack}/api/exercicios`, novoExercicio)
  }

  updateExercicio(id: number, data: IExercicio){
    return this.httpClient.put(`${environment.apiBack}/api/exercicios/${id}`, data)
  }
}
