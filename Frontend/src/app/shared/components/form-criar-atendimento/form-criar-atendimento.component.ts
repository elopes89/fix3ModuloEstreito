import { Component } from '@angular/core';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-criar-atendimento',
  templateUrl: './form-criar-atendimento.component.html',
  styleUrls: ['./form-criar-atendimento.component.css']
})
export class FormCriarAtendimentoComponent {

  alunos: any[] = []
  pedagogos: any[] = []

  registrarForm: FormGroup
  postData = {
    data: '',
    descricao: '',
    aluno_id: 0,
    pedagogo_id: 0
  }

  constructor(private service: ListagemUsuariosService, private route: Router) {
    // Criação do formulário
    this.registrarForm = new FormGroup({
      'aluno': new FormControl('', Validators.required),
      'pedagogo': new FormControl('', Validators.required),
      'descricao': new FormControl('', Validators.required),
      'data': new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    this.getAlunos();
    this.getPedagogos();
  }

  // Lista de alunos
  getAlunos() {
    this.service.getAlunos()
      .subscribe((result) => {
        this.alunos = result
        console.log(this.alunos)
      })
  };

  // Lista de pedagogos
  getPedagogos() {
    this.service.getPedagogos()
      .subscribe((result) => {
        this.pedagogos = result
      })
  };

  // Criar atendimento
  criarAtendimento(){
    const aluno = this.registrarForm.get('aluno')?.value
    const pedagogo = this.registrarForm.get('pedagogo')?.value
    const descricao = this.registrarForm.get('descricao')?.value
    const data = this.registrarForm.get('data')?.value

    const dataFormatada = this.formatarData(data)
    const alunoNumber =  parseInt(aluno)
    const pedagogoNumber =  parseInt(pedagogo)
    
    this.postData = {
      "data": dataFormatada,
      "descricao": descricao,
      "aluno_id": alunoNumber,
      "pedagogo_id": pedagogoNumber
    }

    this.service.postPedagogo(this.postData)
    .subscribe((result) => {
      console.log(result)
      alert("Novo atendimento criado com sucesso!")
     this.route.navigate(['/private/atendimentos'])
    })
  }

  // Validação dos campo
  mensagemErro(campo: string) {
    return (this.registrarForm.get(campo)?.value === null || this.registrarForm.get(campo)?.value.length === 0) && this.registrarForm.get(campo)?.touched
  }

  mensagemErroSelect(campo: string) {
    return (this.registrarForm.get(campo)?.value === '' || this.registrarForm.get(campo)?.value === 'Selecione') && this.registrarForm.get(campo)?.touched
  }

  // Método edição do formato da data
  formatarData(data: string) {
    const parts = data.split('-')
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }

}
