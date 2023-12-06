import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IEndereco } from 'src/app/shared/interfaces/IEndereco';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';
import { IUsuarioInput } from '../../interfaces/IUsuarioInput';

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
  usuariosInp: Array<IUsuario> = [];
  cepBool = false;
  constructor(private formBuilder: FormBuilder, private frontService: FrontService, private router: Router
    , private route: ActivatedRoute) {
    this.frontService.atvBotao = false;
  }


  BuscaCep() {
    this.frontService.getCep(this.cepGet?.value).subscribe((ceps => {
      this.end = ceps;
      this.cepBool = true;
    }));
  }

  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    });
  }

  salvarUserEnd() {
    this.frontService.add(this.registerForm.value, this.usuarios, "api/usuarios").subscribe((user => {
      user.telefone = this.frontService.AjustFone(this.registerForm.get('telefone')?.value);

      this.usuariosInp.push(user);
    }));
  }

  telefone: any
  OnSubmitUser() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.updateName();
      this.salvarUserEnd();
    }
  }

  Update() {
    const id = Number(this.route.snapshot.paramMap.get('id'))
    this.frontService.edit(this.registerForm.value, id).subscribe(user => {
      this.usuariosInp.push(user);
    });
  }
  Editar() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.Update();
    }
  }
  fone = ''
  getFone() {
    if (this.registerForm.get('cpf')?.value.length < 12) {
      this.telMask = "000.000.000-00";
    }
    else
      this.telMask = "000.000.000-00";
    return this.telMask;
  }
  telMask = "000.000.000-00"
  foneModel = '';
  async ngOnInit() {
    this.registerForm = this.formBuilder.group({
      id: [this.usuarioData ? this.usuarioData.id : 0],
      nome: [this.usuarioData ? this.usuarioData.nome : ''],
      email: [this.usuarioData ? this.usuarioData.email : ''],
      cpf: [this.usuarioData ? this.usuarioData.cpf : '', [Validators.required]],
      telefone: [this.usuarioData ? this.usuarioData.telefone : this.foneModel, [Validators.required]],
      genero: [this.usuarioData ? this.usuarioData.genero : ''],
      tipo: [this.usuarioData ? this.usuarioData.tipo : ''],
      status_sistema: [this.usuarioData ? true : true],
      senha: [this.usuarioData ? this.usuarioData.senha : '876543210'],
      matricula_Aluno: [this.usuarioData ? this.usuarioData.matricula_Aluno : '1'],
      codigo_Registro_Professor: [this.usuarioData ? this.usuarioData.codigo_Registro_Professor : 1],
      empresa_Id: [this.usuarioData ? this.usuarioData.empresa_Id : 1],
      cep: [this.usuarioData ? this.usuarioData.cep : '9601001', [Validators.required]],
      localidade: [this.usuarioData ? this.usuarioData.localidade : '', [Validators.required]],
      logradouro: [this.usuarioData ? this.usuarioData.logradouro : '', [Validators.required]],
      bairro: [this.usuarioData ? this.usuarioData.bairro : ''],
      uf: [this.usuarioData ? this.usuarioData.uf : ''],
      numero: [this.usuarioData ? this.usuarioData.numero : '333'],
      complemento: [this.usuarioData ? this.usuarioData.complemento : ''],
    });
  }

  updateName() {
    this.foneModel = this.frontService.AjustFone(this.registerForm.get('telefone')?.value);
    }
  get cepGet() {
    return this.registerForm.get('cep')
  }

  get telefoneGet() {
    return this.registerForm.get('telefone')
  }

}


