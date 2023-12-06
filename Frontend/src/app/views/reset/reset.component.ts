import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { IEmailDto } from 'src/app/shared/interfaces/IEmailDto';
import { IEmpresa } from 'src/app/shared/interfaces/IEmpresa';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';


@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {

  usuarios: Array<IUsuario> = [];
  emailDto: Array<IEmailDto> = [];
  email = 'manu021rj@gmail.com';
  idSenha = 0;
  senhaNova = '';
  codigoEnviado = 0;
  min = 1000;
  max = 9999;
  tbody = Math.floor(Math.random() * (this.max - this.min + 1)) + this.min

  constructor(private frontService: FrontService, private router: Router, private fb: FormBuilder) {
    this.Buscar();
  }

  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    });
  }
  exibiCampoCodigo = false;
  ValidaEmail() {
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].email == this.email) {
        this.exibiCampoCodigo = true;
        this.idSenha = i;
      }
    }
  }
  testeCode = false;
  formReset!: FormGroup;

  ConfirmarCodigo() {
    if (this.tbody == this.codigoEnviado) {
      this.testeCode = true;
    }
    console.log("código enviado " + this.codigoEnviado)
    this.formReset = this.fb.group({
      id: [0],
      email: [this.email],
      senha: [''],
    })

  }

  ngOnInit(): void {
    this.addEmail();
  }

  formLima = new FormGroup({
    emails: new FormArray([]),
    subject: new FormControl('Reset Senha Front'),
    body: new FormControl(this.tbody),
    isHtml: new FormControl(true)
  })

  EditPassWord() {
    this.frontService.EditarSenha(this.formReset.value).subscribe(dto => {
      this.emailDto.push(dto);
    })
    console.log("ResetForm: " + this.formReset.value);
    console.log("ResetForm senha: " + this.formReset.get("senha")?.value);
    console.log("ResetForm email: " + this.formReset.get("email")?.value);

  }




  async OnReset() {
    if (this.formReset.invalid) {
      return
    }
    this.EditPassWord();
    alert("Senha atualizada!!");
    this.router.navigate(['/login'])
  }

  onSubmit() {
    this.ValidaEmail()
    if (this.exibiCampoCodigo == true) {
      this.frontService.EnviarEmail(this.formLima.value).subscribe(login => {
        console.log(login);
        console.log(this.codigoEnviado);
        console.log(this.tbody);
      })
    } else {
      alert("email não cadastrado");
    }
  }

  get emails(): FormArray {
    return this.formLima.get('emails') as FormArray;
  }

  addEmail() {
    this.emails.push(new FormControl());
  }

  get senha() {
    return this.formReset.get('senha')!
  }
}

