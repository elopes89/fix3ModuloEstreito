import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercicioService } from '../../services/exercicio.service';
import { IExercicio } from '../../interfaces/IExercicio';

@Component({
  selector: 'app-form-editar-exercicio',
  templateUrl: './form-editar-exercicio.component.html',
  styleUrls: ['./form-editar-exercicio.component.css']
})
export class FormEditarExercicioComponent {

  alunos: any[] = []
  professores: any[] = []
  exercicioIdString: string | null = ''
  exercicioIdNumber: number = 0
  editarForm: FormGroup

  exercicio: IExercicio = {
    titulo: '',
    descricao: '',
    materia: '',
    data_Conclusao: '',
    professor_id: 0,
    aluno_id: 0
  }


  constructor(private service: ExercicioService, private route: Router, private activateRoute: ActivatedRoute) {
    // Criação do formulário
    this.editarForm = new FormGroup({
      'aluno': new FormControl('', Validators.required),

      'professor': new FormControl('', Validators.required),

      'titulo': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),

      'descricao': new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),

      'materia': new FormControl('', Validators.required),

      'data': new FormControl('', Validators.required),
    })
  }

  ngOnInit() {
    // Pegando o ID do atendimento da URL
    this.activateRoute.paramMap.subscribe(params => {
      this.exercicioIdString = this.activateRoute.snapshot.paramMap.get('id')

      if (this.exercicioIdString !== null) {
        this.exercicioIdNumber = parseInt(this.exercicioIdString)
      }

    });
    this.getAlunos();
    this.getProfessores();
    this.getExercicio(this.exercicioIdNumber)
  }

  editarExercicio() {

    const aluno = this.editarForm.get('aluno')?.value
    const professor = this.editarForm.get('professor')?.value
    const descricao = this.editarForm.get('descricao')?.value
    const titulo = this.editarForm.get('titulo')?.value
    const materia = this.editarForm.get('materia')?.value
    const data = this.editarForm.get('data')?.value

    const dataFormatada = this.formatarData(data)
    const alunoNumber = parseInt(aluno)
    const professorNumber = parseInt(professor)

    const postData = {
      "titulo": titulo,
      "descricao": descricao,
      "materia": materia,
      "data_Conclusao": dataFormatada,
      "professor_id": alunoNumber,
      "aluno_id": professorNumber,
    }

    this.service.updateExercicio(this.exercicioIdNumber, postData)
      .subscribe((result) => {
        alert("Exercício editado com sucesso!")
        this.route.navigate(['/private/exercicios'])
      })
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
  getProfessores() {
    this.service.getProfessores()
      .subscribe((result) => {
        this.professores = result
      })
  };

  // Pegando os dados do exercício
  getExercicio(exercicioId: number) {
    this.service.getExercicio(exercicioId)
      .subscribe((result) => {
        this.exercicio = result
        const dataFormatada = this.formatarDataInput(this.exercicio.data_Conclusao)
        
        this.editarForm.patchValue({
          'descricao': this.exercicio.descricao,
          'data': dataFormatada,
          'aluno': this.exercicio.aluno_id,
          'professor': this.exercicio.professor_id,
          'materia': this.exercicio.materia,
          'titulo': this.exercicio.titulo
        })
      })
  }

  // Validação dos campo
  mensagemErro(campo: string) {
    return (this.editarForm.get(campo)?.value === null || this.editarForm.get(campo)?.value.length === 0) && this.editarForm.get(campo)?.touched
  }

  mensagemErroTamanho(campo: string, tamanhoMaximo: number, tamanhoMinimo: number) {
    return (this.editarForm.get(campo)?.value.length < tamanhoMinimo || this.editarForm.get(campo)?.value.length > tamanhoMaximo) && this.editarForm.get(campo)?.touched
  }

  mensagemErroSelect(campo: string) {
    return (this.editarForm.get(campo)?.value === '' || this.editarForm.get(campo)?.value === 'Selecione') && this.editarForm.get(campo)?.touched
  }

  // Método edição do formato da data
  formatarData(data: string) {
    const parts = data.split('-')
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }

  formatarDataInput(data: string) {
    const parts = data.split('/')
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }
}
