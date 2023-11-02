import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEndereco } from 'src/app/shared/interfaces/IEndereco';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';
import { IUsuarioInput } from '../../interfaces/IUsuarioInput';
import { IEnderecoInput } from '../../interfaces/IEnderecoInput';

@Component({
  selector: 'app-form-buscar-aluno',
  templateUrl: './form-buscar-aluno.component.html',
  styleUrls: ['./form-buscar-aluno.component.css']
})
export class FormBuscarAlunoComponent {

  @Input() usuarioData: IUsuario | null = null;

  registerEndereco!: FormGroup;
  enderecos: Array<IEnderecoInput> = [];
  submitted = false;
  disBotao = this.frontService.atvBotao;
  registerForm!: FormGroup;
  end!: IEndereco;
  usuarios: Array<IUsuarioInput> = [];
  cepBool = false;
  constructor(private formBuilder: FormBuilder, private frontService: FrontService, private router: Router) { }

  showFormularioBuscarAluno: boolean = false;
  showFormularioEditarAtendimento: boolean = false;

  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    })
  }

  salvarUserEnd() {
    this.frontService.add(this.registerForm.value, this.usuarios, "CriarUsuario").subscribe((user => {
      this.usuarios.push(user);
    }));
  }


  OnSubmitUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.salvarUserEnd();
      alert("user salvo");
    }
  }



  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [0],
      nome: [''],
      email: ['123@g.com'],
      cpf: [''],
      telefone: ['', [Validators.required]],
      genero: [''],
      tipo: [''],
      status_sistema: [true],
      senha: ["12345676"],
      matricula_Aluno: ["12345"],
      codigo_Registro_Professor: [1],
      empresa_Id: [1],
      Endereco: this.formBuilder.group({
        id: [0],
        cep: ['', [Validators.required]],
        localidade: ['', [Validators.required]],
        logradouro: ['', [Validators.required]],
        bairro: [''],
        uf: [''],
        numero: [''],
        complemento: ['']
      })
    });
  }

  EditarUsuario() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else
      this.frontService.edit(this.registerForm.value, this.frontService.idDetail).subscribe(user => {
        this.frontService.usuarios.push(user);
      });
    this.frontService.boolEditar = false;
    this.router.navigate(['/home']);
  }

  editar() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else
      this.frontService.edit(this.registerForm.value, this.frontService.idDelete).subscribe(user => {
        this.usuarios.push(user);
      });
    this.frontService.boolEditar = false;
    this.router.navigate(['/']);
  }

  excluir() {
    this.frontService.del(this.frontService.idDelete).subscribe(user => {
      this.usuarios.push(user);
      alert("deletado");
      this.Buscar();
    });
  }


  formularioBuscarAluno() {
    this.showFormularioBuscarAluno = !this.showFormularioBuscarAluno;
    if (this.showFormularioEditarAtendimento === true) {
      this.showFormularioEditarAtendimento = false;
    }
  }

  formularioEditarAtendimento() {
    this.showFormularioEditarAtendimento = !this.showFormularioEditarAtendimento;
    if (this.showFormularioBuscarAluno === true) {
      this.showFormularioBuscarAluno = false;
    }
  }

}
