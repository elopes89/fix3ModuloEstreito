import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEndereco } from '../interfaces/IEndereco';
import { IUsuario } from '../interfaces/IUsuario';
import { ILogin } from '../interfaces/ILogin';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILog } from '../interfaces/ILog';
import { IEmail } from '../interfaces/IEmail';
import { IEmailDto } from '../interfaces/IEmailDto';

@Injectable({
  providedIn: 'root'
})
export class FrontService {

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
  }
  idDelete = 0;
  atvBotao = false;
  boolEditar = false;
  idDetail = 0;
  enderecos: Array<IEndereco> = [];
  usuarios: Array<IUsuario> = [];
  apiBackBase = "http://localhost:5009"

  id_Endereco: number = this.enderecos.length;

  getCep(cep: string): Observable<any> {
    return this.http.get<any>(`http://viacep.com.br/ws/${cep}/json`);
  }

  getAll(endpoint: string, tipo: any): Observable<typeof tipo[]> {
    return this.http.get<[]>(`${this.apiBackBase}/${endpoint}`);
  }

  add(usuario: any, t: any, endpoint: string): Observable<typeof t> {
    return this.http.post<typeof t>(`${this.apiBackBase}/${endpoint}`, usuario);
  }

  edit(usuario: IUsuario, id: number): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.apiBackBase}/api/usuarios/${id}`, usuario)
  }
  getId(id: number, endPoint: string, t: any): Observable<typeof t> {
    return this.http.get<typeof t>(`${this.apiBackBase}/${endPoint}/${id}`)
  }

  del(id: number): Observable<IUsuario> {
    return this.http.delete<IUsuario>(`${this.apiBackBase}/DeletarUsuario/${id}`)
  }

  sign(token: any): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.apiBackBase}/login`, token)
  }

  addLog(usuario: any, t: any, endpoint: string): Observable<typeof t> {
    return this.http.post<typeof t>(`${this.apiBackBase}/${endpoint}`, usuario)
  }

  reset(usuario: any): Observable<IUsuario> {
    return this.http.put<IUsuario>(`${this.apiBackBase}/resetar`, usuario)
  }

  formLog!: FormGroup;
  logs!: ILog;

  SalvarLog(acao: string, detalhes: string) {
    this.formLog = this.formBuilder.group({
      id: [0],
      acao: [acao],
      data: [Date],
      nome: [sessionStorage.getItem('userNome')],
      usuario_Id: [sessionStorage.getItem('userId')],
      detalhes: [detalhes]
    });
  }

  ResetarSenha(email: IEmail): Observable<IEmail> {
    return this.http.post<IEmail>(`${this.apiBackBase}/api/email`, email)
  }

  EditarSenha(emailDto: IEmailDto): Observable<IEmailDto> {
    return this.http.put<IEmailDto>(`${this.apiBackBase}/resetar`, emailDto)

  }

  AjustFone(telefone: any): string {
    var tel = ['(']
    if (telefone != null) {
      for (let i = 0; i < telefone.length; i++) {
        tel.push(telefone[i]);
      }
      tel.splice(3, 1, ') 9 ');
      tel.splice(7, 1, `${telefone.at(7)}-`);
    }
    telefone = tel.join('');
    return telefone;
  }

  EnviarEmail(email: any): Observable<any> {
    return this.http.post<any>(`${this.apiBackBase}/api/email`, email);
  }

  numVericacao = 0;

}
