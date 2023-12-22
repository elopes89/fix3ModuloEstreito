import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IEmpresa } from '../interfaces/IEmpresa';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  empresa!: IEmpresa
  corCard = ""
  constructor(private httpClient: HttpClient) { }

  getEmpresa(id: number) {
    return this.httpClient.get<IEmpresa>(`${environment.apiBack}/api/whitelabel/${id}`)
  }

  salvar(data: IEmpresa): Observable<IEmpresa> {
    return this.httpClient.post<IEmpresa>(`${environment.apiBack}/api/whitelabel/`, data)
  }

  updateEmpresa(id: number, data: IEmpresa) {
    return this.httpClient.put(`${environment.apiBack}/api/whitelabel/${id}`, data)
  }
}
