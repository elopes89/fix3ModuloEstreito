import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DetalhamentoAlunoService } from '../../services/detalhamento-aluno.service';

@Component({
  selector: 'app-exercicios',
  templateUrl: './exercicios.component.html',
  styleUrls: ['./exercicios.component.css']
})
export class ExerciciosComponent {

  aluno_id: number = 1
  exercicios: any[] = []
  exerciciosOriginal: any[] = []
  pesquisa: string = ''

  constructor(private service: DetalhamentoAlunoService, private route: Router) { }


  ngOnInit() {
    this.getExercicios()
  }

  search() {
    if (this.pesquisa) {

      this.exercicios = this.exerciciosOriginal
        .filter(user =>
          user.aluno_nome['nome'].toLowerCase().includes(this.pesquisa.toLowerCase())
        );

      if (this.exercicios.length === 0) {
        this.exercicios = this.exerciciosOriginal;
        alert("Nenhum resultado encontrado!");
      }

    }
    else if (this.pesquisa === '') {
      this.exercicios = this.exerciciosOriginal;
    }
  }


  getExercicios() {
    this.service.getExercicios()
      .subscribe((result) => {
        this.exercicios = result
        this.exerciciosOriginal = [...this.exercicios]
      });
  };

  deletarExercicio(id: number) {
    this.service.deleteExercicio(id)
      .subscribe(() => {
        alert("Deletado com sucesso!")
        this.getExercicios()
      },
        (error: any) => {
          console.error('Erro ao deletar exercício:', error);
        }
      );
  }

  redirecionarFormEditarExercicio(id: number) {
    this.route.navigate([`/private/editar-exercicio/${id}`])
  }

  redirecionarFormCriarExercicio() {
    this.route.navigate([`/private/criar-exercicio`])
  }
}
