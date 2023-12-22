import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEndereco } from '../interfaces/IEndereco';
import { IUsuario } from '../interfaces/IUsuario';
import { ILogin } from '../interfaces/ILogin';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILog } from '../interfaces/ILog';
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
  idLog = sessionStorage.getItem('userId')
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
    return this.http.delete<IUsuario>(`${this.apiBackBase}/api/usuarios/${id}`)
  }

  sign(token: any): Observable<ILogin> {
    return this.http.post<ILogin>(`${this.apiBackBase}/login`, token)
  }

  formLog!: FormGroup;
  logs!: ILog;

  addLog() {
    this.add(this.formLog.value, this.logs, "api/logs").subscribe(log => {
      console.log(log);
    })
  }

  SalvarLog(acao: string) {
    this.formLog = this.formBuilder.group({
      id: [0],
      usuario_Id: [sessionStorage.getItem('userId')],
      acao: [acao],
      data: [this.FormatData()],
      nome: [sessionStorage.getItem('userNome')],
      tipo: [sessionStorage.getItem('userTipo')],
    });
  }

  EditarSenha(emailDto: IEmailDto): Observable<IEmailDto> {
    return this.http.put<IEmailDto>(`${this.apiBackBase}/resetar`, emailDto)
  }

  EnviarEmail(email: any): Observable<any> {
    return this.http.post<any>(`${this.apiBackBase}/api/email`, email);
  }

  FormatData() {
    const date = new Date();
    const ano = date.getFullYear();
    const mes = date.getMonth();
    const dia = date.getDate();
    const h = date.getHours();
    const min = date.getMinutes();

    return `${dia}/${mes}/${ano} Hora: ${h}:${min}`;
  }

  FormataHora() {
    const hora = new Date();
    const h = hora.getHours();
    const min = hora.getMinutes();
    return `${h}:${min}`;
  }

}
