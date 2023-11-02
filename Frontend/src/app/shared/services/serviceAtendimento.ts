import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import { IAtendimento } from '../interfaces/IAtendimento';
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
    return lastValueFrom(this.httpClient.get<IAtendimento[]>('https://localhost:5009/api/Atendimentos'));
  }

  obterAtendimentoPorId(id: number) {
    return lastValueFrom(this.httpClient.get<IAtendimento>('http://localhost:5009/Atendimentos' + id));
  }

  cadastrar(atendimento: IAtendimento) {
    return lastValueFrom(this.httpClient.post('http://localhost:5009/Atendimentos', atendimento));
  }

  editar(atendimento: IAtendimento) {
    //url do endpoint a ser chamado
    const url = 'https://localhost:5009/api/Atendimentos';
    const headers: HttpHeaders = this.corsService.getCorsHeaders();

    //construção do objeto para envio
    const body = {
      id: this.atendimentoForm.value.id,
      descricao: this.atendimentoForm.value.nome,
      data: this.atendimentoForm.value.data,
      id_aluno: this.atendimentoForm.value.id_Aluno,
      id_pedagogo: this.atendimentoForm.value.id_Pedagogo
    }
  }
}
