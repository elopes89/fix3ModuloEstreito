import { FrontService } from 'src/app/shared/services/front.service';
import { Component } from '@angular/core';
import { ExercicioService } from '../../services/exercicio.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUsuario } from '../../interfaces/IUsuario';

@Component({
  selector: 'app-form-criar-exercicio',
  templateUrl: './form-criar-exercicio.component.html',
  styleUrls: ['./form-criar-exercicio.component.css']
})
export class FormCriarExercicioComponent {

  idProf = 0;
  usuarios: Array<IUsuario> = []
  alunos: any[] = []
  professores: any[] = []
  registrarForm: FormGroup
  permissao = sessionStorage.getItem('userTipo')
  constructor(private service: ExercicioService, private route: Router, private frontService: FrontService) {
    this.Buscar()
    this.registrarForm = new FormGroup({
      'aluno': new FormControl('', Validators.required),

      'professor': new FormControl('', Validators.required),

      'titulo': new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(64)]),

      'descricao': new FormControl('', [Validators.required, Validators.minLength(15), Validators.maxLength(255)]),

      'materia': new FormControl('', Validators.required),

      'data': new FormControl('', Validators.required),
    })
  }

  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    });
  }

  ngOnInit() {
    this.getAlunos();
    this.getProfessores();
  }


  ti() {
    var alunoNumber = 0
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].nome == this.registrarForm.get('aluno')?.value) {
        alunoNumber = i;
      }
    }
    return alunoNumber;
  }
    top() {
      var professorNumber = 0
      for (let i = 0; i < this.usuarios.length; i++) {
        if (this.usuarios[i].nome == this.registrarForm.get('professor')?.value) {
          var professorNumber = i;
        }
      }
      return professorNumber;
    }

    criarExercicio() {

      const aluno = Number(this.registrarForm.get('aluno')?.value)
      const professor = Number(this.registrarForm.get('professor')?.value)
      const descricao = this.registrarForm.get('descricao')?.value
      const titulo = this.registrarForm.get('titulo')?.value
      const materia = this.registrarForm.get('materia')?.value
      const data = this.registrarForm.get('data')?.value
      const dataFormatada = this.formatarData(data)

      const postData = {
        "titulo": titulo,
        "descricao": descricao,
        "materia": materia,
        "data_Conclusao": dataFormatada,
        "professor_id": professor,
        "aluno_id": aluno,
      }

      this.service.postExercicio(postData)
        .subscribe((result) => {
          alert("Novo exercício criado com sucesso!")
          this.route.navigate(['/private/exercicios'])
        });
      this.frontService.SalvarLog("Criou um atendimento");
      this.frontService.addLog();
    }

    getAlunos() {
      this.service.getAlunos()
        .subscribe((result) => {
          this.alunos = result
          console.log(this.alunos)
        })
    };

    getProfessores() {
      this.service.getProfessores()
        .subscribe((result) => {
          this.professores = result
        })
    };

    mensagemErro(campo: string) {
      return (this.registrarForm.get(campo)?.value === null || this.registrarForm.get(campo)?.value.length === 0) && this.registrarForm.get(campo)?.touched
    }

    mensagemErroTamanho(campo: string, tamanhoMaximo: number, tamanhoMinimo: number) {
      return (this.registrarForm.get(campo)?.value.length < tamanhoMinimo || this.registrarForm.get(campo)?.value.length > tamanhoMaximo) && this.registrarForm.get(campo)?.touched
    }

    mensagemErroSelect(campo: string) {
      return (this.registrarForm.get(campo)?.value === '' || this.registrarForm.get(campo)?.value === 'Selecione') && this.registrarForm.get(campo)?.touched
    }

    formatarData(data: string) {
      const parts = data.split('-')
      return `${parts[2]}/${parts[1]}/${parts[0]}`
    }
  }
