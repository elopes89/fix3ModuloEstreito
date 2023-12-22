import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DetalhamentoAlunoService } from '../../services/detalhamento-aluno.service';

@Component({
  selector: 'app-atendimentos',
  templateUrl: './atendimentos.component.html',
  styleUrls: ['./atendimentos.component.css']
})
export class AtendimentosComponent implements OnInit {

  aluno_id: number = 1
  atendimentos: any[] = []
  atendimentoOriginal: any[] = []
  pesquisa: string = ''
  permissao = sessionStorage.getItem('userTipo')


  constructor(private service: DetalhamentoAlunoService, private route: Router) { }


  ngOnInit() {
    this.getAtendimentos()
  }

  search() {
    if (this.pesquisa) {
      console.log(this.atendimentos)
      this.atendimentos = this.atendimentoOriginal
        .filter(user =>
          user.aluno_nome['nome'].toLowerCase().includes(this.pesquisa.toLowerCase())
        );

      if (this.atendimentos.length === 0) {
        this.atendimentos = this.atendimentoOriginal;
        alert("Nenhum resultado encontrado!");
      }

    }
    else if (this.pesquisa === '') {
      this.atendimentos = this.atendimentoOriginal;
    }
  }

  getAtendimentos() {
    this.service.getAtendimentos()
      .subscribe((result) => {
        this.atendimentos = result
        this.atendimentoOriginal = [...this.atendimentos]
      });
  };

  deletarAtendimento(id: number) {
    this.service.deleteAtendimento(id)
      .subscribe(() => {
        alert("Deletado com sucesso!")
        this.getAtendimentos()
      },
        (error: any) => {
          console.error('Erro ao deletar exercício:', error);
        }
      );
  }

  redirecionarFormEditarAtendimento(id: number) {
    this.route.navigate([`/private/editar-atendimento/${id}`])
  }

  redirecionarFormCriarAtendimento(){
    this.route.navigate([`/private/criar-atendimento`])
  }
}
