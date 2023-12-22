import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ExercicioService } from '../../services/exercicio.service';
import { IExercicio } from '../../interfaces/IExercicio';
import { FrontService } from '../../services/front.service';
import { IUsuario } from '../../interfaces/IUsuario';

@Component({
  selector: 'app-form-editar-exercicio',
  templateUrl: './form-editar-exercicio.component.html',
  styleUrls: ['./form-editar-exercicio.component.css']
})
export class FormEditarExercicioComponent implements OnInit {
  ex!: IExercicio
  alunos: Array<IUsuario> = []
  professores: Array<IUsuario> = []
  exercicioIdString: string | null = ''
  exercicioIdNumber: number = 0
  editarForm!: FormGroup
  idProf = 0;
  idAlunis = 0;
  usuarios: Array<IUsuario> = []
  exercicio: IExercicio = {
    titulo: '',
    descricao: '',
    materia: '',
    data_Conclusao: '',
    professor_id: 0,
    aluno_id: 0
  }


  constructor(private service: ExercicioService, private route: Router, private activateRoute: ActivatedRoute,
    private frontService: FrontService) {
    this.Buscar();
  }
  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    });
  }


  async ngOnInit() {
    this.activateRoute.paramMap.subscribe(params => {
      this.exercicioIdString = this.activateRoute.snapshot.paramMap.get('id')

      if (this.exercicioIdString !== null) {
        this.exercicioIdNumber = parseInt(this.exercicioIdString)
      }
    });
    this.getAlunos();
    this.getProfessores();
    this.getExercicio(this.exercicioIdNumber);


    const id = Number(this.activateRoute.snapshot.paramMap.get('id'));
    this.service.getExercicio(id).subscribe(ex => {
      this.ex = ex;
      console.log(this.ex)
    })

    this.editarForm = new FormGroup({
      'aluno_nome': new FormControl('', Validators.required),

      'professor_nome': new FormControl('', Validators.required),

      'titulo': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),

      'descricao': new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),

      'materia': new FormControl('', Validators.required),

      'data': new FormControl('', Validators.required),
    })
  }

  nomeAlunoEId() {
    var id;
    const nome = this.editarForm.get("aluno_nome")?.value
    for (let i = 0; i < this.alunos.length; i++) {
      if (this.alunos[i].nome == nome) {
        id = i;
      }
    }
    return id;
  }


  nomeProfEId() {
    var id;
    const nome = this.editarForm.get("professor_nome")?.value
    for (let i = 0; i < this.professores.length; i++) {
      if (this.professores[i].nome == nome) {
        id = i;
      }
    }
    return id;
  }

  editarExercicio() {
    const descricao = this.editarForm.get('descricao')?.value
    const titulo = this.editarForm.get('titulo')?.value
    const materia = this.editarForm.get('materia')?.value
    const data = this.editarForm.get('data')?.value
    const dataFormatada = this.formatarData(data)
    const alunoNumber = this.ex ? this.ex.aluno_id : this.nomeAlunoEId();
    const professorNumber = this.ex ? this.ex.professor_id : this.nomeProfEId();


    const postData = {
      "titulo": titulo,
      "descricao": descricao,
      "materia": materia,
      "data_Conclusao": dataFormatada,
      "professor_id": professorNumber,
      "aluno_id": alunoNumber
    }


    this.service.updateExercicio(this.exercicioIdNumber, postData)
      .subscribe((result) => {
        alert("Exercício editado com sucesso!" + result)
        this.route.navigate(['/private/exercicios'])
      });
    this.frontService.SalvarLog("Editou um exercício ");
    this.frontService.addLog();
  }

  getAlunos() {
    this.service.getAlunos()
      .subscribe((result) => {
        this.alunos = result
      })
  };

  getProfessores() {
    this.service.getProfessores()
      .subscribe((result) => {
        this.professores = result
      })
  };
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

  mensagemErro(campo: string) {
    return (this.editarForm.get(campo)?.value === null || this.editarForm.get(campo)?.value.length === 0) && this.editarForm.get(campo)?.touched
  }

  mensagemErroTamanho(campo: string, tamanhoMaximo: number, tamanhoMinimo: number) {
    return (this.editarForm.get(campo)?.value.length < tamanhoMinimo || this.editarForm.get(campo)?.value.length > tamanhoMaximo) && this.editarForm.get(campo)?.touched
  }

  mensagemErroSelect(campo: string) {
    return (this.editarForm.get(campo)?.value === '' || this.editarForm.get(campo)?.value === 'Selecione') && this.editarForm.get(campo)?.touched
  }

  formatarData(data: string) {
    const parts = data.split('-')
    return `${parts[2]}/${parts[1]}/${parts[0]}`
  }

  formatarDataInput(data: string) {
    const parts = data.split('/')
    return `${parts[2]}-${parts[1]}-${parts[0]}`;
  }


  get getAluno() {
    return this.editarForm.get('aluno')?.value
  }
}
