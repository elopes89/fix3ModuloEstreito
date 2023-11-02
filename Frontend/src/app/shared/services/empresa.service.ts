import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { IEmpresa } from '../interfaces/IEmpresa';

@Injectable({
  providedIn: 'root'
})
export class EmpresaService {

  constructor(private httpClient: HttpClient) { }

  getEmpresa(id: number){
    return this.httpClient.get<IEmpresa>(`${environment.apiBack}/api/whitelabel/${id}`)
  }

  updateEmpresa(id: number, data: IEmpresa){
    return this.httpClient.put(`${environment.apiBack}/api/whitelabel/${id}`, data)
  }
}
