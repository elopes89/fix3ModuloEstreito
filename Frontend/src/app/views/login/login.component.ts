import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILog } from 'src/app/shared/interfaces/ILog';
import { ILogin } from 'src/app/shared/interfaces/ILogin';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class loginComponent implements OnInit {
  submitted = false;
  usuarios: Array<IUsuario> = [];
  loginUsuario: Array<ILogin> = [];
  token: any;
  logs!: ILog;


  constructor(private formBuilder: FormBuilder, private frontService: FrontService, private router: Router) {
    this.Buscar();
  }

  registerForm!: FormGroup;
  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    });
  }

  verificarLogin() {
    var index = 400;
    for (let i = 0; i < this.usuarios.length; i++) {
      if (this.usuarios[i].senha == this.registerForm.get('senha')?.value && (this.usuarios[i].email == this.registerForm.get('email')?.value)) {
        index = i;
      }
    }
    if (this.usuarios[index].tipo == "Aluno") {
      alert('Acesso Negado')
    } else {
      sessionStorage.setItem('userTipo', this.usuarios[index].tipo);
      sessionStorage.setItem('userNome', this.usuarios[index].nome);
      sessionStorage.setItem('userId', this.usuarios[index].id.toString());
      this.frontService.SalvarLog("entrou no sistema");
      this.frontService.addLog();
      this.Logar();
      this.router.navigate([`/private`]);
    }
  }

  Logar() {
    this.frontService.sign(this.registerForm.value).subscribe(login => {
      this.loginUsuario.push(login);
      this.token = login;
      sessionStorage.setItem("token", this.token.token);
    });
  }

  OnSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return
    } else {
      this.verificarLogin();
    }
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      id: [0],
      email: ['email@gmail.com', [Validators.required, Validators.email]],
      senha: ['12345678admin', [Validators.required]]
    });
  }

  get email() {
    return this.registerForm.get('email')!
  }

  get senha() {
    return this.registerForm.get('senha')!
  }

}

