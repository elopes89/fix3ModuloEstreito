import { FrontService } from 'src/app/shared/services/front.service';
import { Component, Input } from '@angular/core';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IAtendimento } from '../../interfaces/IAtendimento';
import { IUsuario } from '../../interfaces/IUsuario';
import { serviceAtendimento } from '../../services/serviceAtendimento';

@Component({
  selector: 'app-form-criar-atendimento',
  templateUrl: './form-criar-atendimento.component.html',
  styleUrls: ['./form-criar-atendimento.component.css']
})
export class FormCriarAtendimentoComponent {
  @Input() atendiData: IAtendimento | null = null;

  usuarios: Array<IUsuario> = [];
  alunos: any[] = []
  pedagogos: any[] = []
  permissao = sessionStorage.getItem('userTipo')
  registerForm!: FormGroup;
  atendimentos!: IAtendimento;
  constructor(private formBuilder: FormBuilder, private active: ActivatedRoute, private sa: serviceAtendimento,
    private service: ListagemUsuariosService, private route: Router, private fr: FrontService) {
  }

  Up() {
    const id = Number(this.active.snapshot.paramMap.get('id'))
    const data = this.registerForm.get('data')?.value
    const formatData = this.formatarData(data)
    const alunoNumber = this.atendiData ? this.atendiData.aluno_id : this.nomeAlunoEId()
    const pedNumber = this.atendiData ? this.atendiData.pedagogo_id : this.nomePedEId()

    const postData = {
      "descricao": this.registerForm.get('descricao')?.value,
      "data": formatData,
      "pedagogo_id": pedNumber,
      "aluno_id": alunoNumber
    }
    this.sa.editar(postData, id).subscribe(user => {
      console.log(user);
    });
    this.route.navigate(["/private/atendimentos"]);
  }


  nomeAlunoEId() {
    var id;
    const nome = this.registerForm.get("aluno_nome")?.value
    for (let i = 0; i < this.alunos.length; i++) {
      if (this.alunos[i].nome == nome) {
        id = i;
      }
    }
    return id;
  }

  nomePedEId() {
    var id;
    const nome = this.registerForm.get("pedagogo_nome")?.value
    for (let i = 0; i < this.pedagogos.length; i++) {
      if (this.pedagogos[i].nome == nome) {
        id = i;
      }
    }
    return id;
  }

  criarAtendimento() {
    const aluno = this.nomeAlunoEId()
    const pedagogo = this.nomePedEId()
    const data = this.registerForm.get('data')?.value
    const formatData = this.formatarData(data)

    const postData = {
      "descricao": this.registerForm.get('descricao')?.value,
      "data": formatData,
      "pedagogo_id": pedagogo,
      "aluno_id": aluno
    }
    this.sa.cadastrar(postData).subscribe(atendi => {
      console.log(atendi);
      this.fr.SalvarLog("Criou um atendimento");
      this.fr.addLog();
      alert("Salvo")
      this.route.navigate(["/private/atendimentos"])
    });
  }


  ngOnInit() {
    this.getAlunos();
    this.getPedagogos();
    this.registerForm = this.formBuilder.group({
      id: [this.atendiData ? this.atendiData.id : 0],
      aluno_nome: [this.atendiData ? this.atendiData.aluno_nome?.nome : '', [Validators.required]],
      pedagogo_nome: [this.atendiData ? this.atendiData.pedagogo_nome?.nome : '', [Validators.required]],
      descricao: [this.atendiData ? this.atendiData.descricao : ''],
      data: [this.atendiData ? this.formatarDataInput(this.atendiData.data) : ''],
    })

    const id = Number(this.active.snapshot.paramMap.get('id'))
    this.sa.obterAtendimentoPorId(id).subscribe(atendi => {
      this.atendimentos = atendi;
    });

  }

  getAlunos() {
    this.service.getAlunos()
      .subscribe((result) => {
        this.alunos = result
      })
  };

  getPedagogos() {
    this.service.getPedagogos()
      .subscribe((result) => {
        this.pedagogos = result
      })
  };

  formatarDataInput(data: string) {
    const parts = data.split('/')
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }

  mensagemErro(campo: string) {
    return (this.registerForm.get(campo)?.value === null || this.registerForm.get(campo)?.value.length === 0) && this.registerForm.get(campo)?.touched
  }

  mensagemErroSelect(campo: string) {
    return (this.registerForm.get(campo)?.value === '' || this.registerForm.get(campo)?.value === 'Selecione') && this.registerForm.get(campo)?.touched
  }

  formatarData(data: string) {
    const parts = data.split('-')
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }
}
