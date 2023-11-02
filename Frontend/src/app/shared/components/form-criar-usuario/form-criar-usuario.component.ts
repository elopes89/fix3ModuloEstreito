import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEndereco } from 'src/app/shared/interfaces/IEndereco';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';
import { IUsuarioInput } from '../../interfaces/IUsuarioInput';
import { IEnderecoInput } from '../../interfaces/IEnderecoInput';

@Component({
  selector: 'app-form-criar-usuario',
  templateUrl: './form-criar-usuario.component.html',
  styleUrls: ['./form-criar-usuario.component.css']
})
export class FormCriarUsuarioComponent {

  @Input() usuarioData: IUsuario | null = null;

  registerEndereco!: FormGroup;
  submitted = false;
  disBotao = this.frontService.atvBotao;
  registerForm!: FormGroup;
  end!: IEndereco;
  usuarios: Array<IUsuario> = [];
  cepBool = false;
  constructor(private formBuilder: FormBuilder, private frontService: FrontService, private router: Router) { }


  BuscaCep() {
    this.frontService.getCep(this.cepGet?.value).subscribe((ceps => {
      this.end = ceps;
      this.cepBool = true;
    }));
  }


  Excluir(){}
  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    });
  }

  salvarUserEnd() {
    this.frontService.add(this.registerForm.value, this.usuarios, "api/usuarios").subscribe((user => {
      this.usuarios.push(user);
    }));
  }


  OnSubmitUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.salvarUserEnd();
    }
  }


  Update() {
    this.frontService.edit(this.registerForm.value, this.registerForm.get('id')?.value).subscribe(user => {
      this.frontService.usuarios.push(user);
      this.Buscar();
    });
  }
  Editar() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.Update();
      this.router.navigate(['/private/dashboard']);
    }
  }





  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [this.usuarioData ? this.usuarioData.id : ''],
      nome: [this.usuarioData ? this.usuarioData.nome : ''],
      email: [this.usuarioData ? this.usuarioData.email : ''],
      cpf: [this.usuarioData ? this.usuarioData.cpf : '111.222.333-21'],
      telefone: [this.usuarioData ? this.usuarioData.telefone : '(99) 9 2233-2233', [Validators.required]],
      genero: [this.usuarioData ? this.usuarioData.genero : ''],
      tipo: [this.usuarioData ? this.usuarioData.tipo : ''],
      status_sistema: [this.usuarioData ? this.usuarioData.status_sistema : true],
      senha: [this.usuarioData ? this.usuarioData.senha : '876543210'],
      matricula_Aluno: [this.usuarioData ? this.usuarioData.matricula_Aluno : '1'],
      codigo_Registro_Professor: [this.usuarioData ? this.usuarioData.codigo_Registro_Professor : 1],
      empresa_Id: [this.usuarioData ? this.usuarioData.empresa_Id : 1],
      cep: [this.usuarioData ? this.usuarioData.cep : '', [Validators.required]],
      localidade: [this.usuarioData ? this.usuarioData.localidade : '', [Validators.required]],
      logradouro: [this.usuarioData ? this.usuarioData.logradouro : '', [Validators.required]],
      bairro: [this.usuarioData ? this.usuarioData.bairro : ''],
      uf: [this.usuarioData ? this.usuarioData.uf : ''],
      numero: [this.usuarioData ? this.usuarioData.numero : '333'],
      complemento: [this.usuarioData ? this.usuarioData.complemento : ''],
    });
    // Endereco: this.formBuilder.group({
  }

  get cepGet() {
    return this.registerForm.get('cep')
  }

}


