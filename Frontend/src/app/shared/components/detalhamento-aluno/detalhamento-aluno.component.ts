import { Component } from '@angular/core';
import { IUsuario } from '../../interfaces/IUsuario';
import { DetalhamentoAlunoService } from '../../services/detalhamento-aluno.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detalhamento-aluno',
  templateUrl: './detalhamento-aluno.component.html',
  styleUrls: ['./detalhamento-aluno.component.css']
})
export class DetalhamentoAlunoComponent {

  aluno: IUsuario | undefined
  atendimentos: any[] = []
  avaliacoes: any[] = []
  exercicios: any[] = []
  aluno_id: number = 1

  constructor(private detalhamentoAlunoService: DetalhamentoAlunoService, private route: Router) { }

  ngOnInit() {
    this.detalhamentoAlunoService.getAluno(this.aluno_id)
      .subscribe((result) => {
        this.aluno = result

        if (this.aluno.matricula_Aluno == undefined) {
          this.aluno.matricula_Aluno = "-"
        }
        if (this.aluno.complemento == undefined) {
          this.aluno.complemento = "-"
        }
        
      });

      this.getAtendimento();
      this.getAvaliacoes();
      this.getExercicios();
  }


  // Métodos atendimentos
  getAtendimento() {
    this.detalhamentoAlunoService.getAtendimentos()
      .subscribe((result) => {
        this.atendimentos = result.filter((atendimento => atendimento.aluno_id === this.aluno_id))
      });
  };

  deletarAtendimento(id: number) {
    this.detalhamentoAlunoService.deleteAtendimento(id)
      .subscribe(() => {
        alert("Deletado com sucesso!")
        this.getAtendimento()
      },
        (error: any) => {
          console.error('Erro ao deletar usuário:', error);
        }
      );
  }

  redirecionarFormAtendimento(idAtendimento: number) {
    this.route.navigate([`/private/editar-atendimento/${idAtendimento}`])
  }

  // Métodos avaliações
  getAvaliacoes() {
    this.detalhamentoAlunoService.getAvaliacoes()
      .subscribe((result) => {
        this.avaliacoes = result.filter((avaliacao => avaliacao.aluno_id === this.aluno_id))
      });
  };

  deletarAvaliacao(id: number) {
    this.detalhamentoAlunoService.deleteAvaliacao(id)
      .subscribe(() => {
        alert("Deletado com sucesso!")
        this.getAvaliacoes()
      },
        (error: any) => {
          console.error('Erro ao deletar usuário:', error);
        }
      );
  }

  redirecionarFormAvaliacao() {
    this.route.navigate([`/private/dashboard`])
  }

  // Métodos exercícios
  getExercicios() {
    this.detalhamentoAlunoService.getExercicios()
      .subscribe((result) => {
        console.log(this.exercicios)
        this.exercicios = result.filter((exercicio => exercicio.aluno_id === 1))
      });
  }

  deletarExercicio(id: number) {
    this.detalhamentoAlunoService.deleteExercicio(id)
      .subscribe(() => {
        alert("Deletado com sucesso!")
        this.getExercicios()
      },
        (error: any) => {
          console.error('Erro ao deletar usuário:', error);
        }
      );
  }

  redirecionarFormExercicio() {
    this.route.navigate([`/private/dashboard`])
  }

}
