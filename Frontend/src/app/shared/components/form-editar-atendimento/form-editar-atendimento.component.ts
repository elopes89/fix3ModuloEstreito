import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IAtendimento } from '../../interfaces/IAtendimento';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { FrontService } from '../../services/front.service';
import { IUsuario } from '../../interfaces/IUsuario';
import { serviceAtendimento } from '../../services/serviceAtendimento';

@Component({
  selector: 'app-form-editar-atendimento',
  templateUrl: './form-editar-atendimento.component.html',
  styleUrls: ['./form-editar-atendimento.component.css']
})
export class FormEditarAtendimentoComponent implements OnInit {

  modoEdicao = false;
  atendimentoEdicao!: IAtendimento;
  editarAtendimentoForm!: FormGroup;
  serviceAtedimento: any;
  route: any;
  serviceAtendimento: any;
  alunos: Array<string> = [];
  pedagogos: Array<string> = [];
  usuarios: Array<IUsuario> = [];
  constructor(private sa: serviceAtendimento, private active: ActivatedRoute, private frontService: FrontService, private router: Router) {
    this.Buscar();

  }

  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].tipo == 'Aluno') {
          this.alunos.push(this.usuarios[i].nome)
        }

        if (this.usuarios[i].tipo == 'Pedagogo') {
          this.pedagogos.push(this.usuarios[i].nome)
        }
      }
      console.log(this.alunos + " " + this.pedagogos)
    });
  }

  async ngOnInit() {
    const id = Number(this.active.snapshot.paramMap.get('id'))
    this.sa.obterAtendimentoPorId(id).subscribe(item => {
      this.atendimentoEdicao = item;
      this.frontService.atvBotao = true;
    });
  }
}
