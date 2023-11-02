import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IEndereco } from 'src/app/shared/interfaces/IEndereco';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';



@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {

  @Input() usuarioData: IUsuario | null = null;

  enderecos: Array<IEndereco> = [];
  submitted = false;
  disBotao = this.frontService.atvBotao;
  registerForm!: FormGroup;
  usuarios: Array<IUsuario> = [];
  usuariosOriginal: Array<IUsuario> = [];
  endId = 0;
  pesquisa: string = ''

  constructor(private formBuilder: FormBuilder, private frontService: FrontService, private router: Router) {
    this.Buscar();
  }

  redirecionarFormEditarUsuario(id: number) {
    this.router.navigate([`/private/editar-usuario/${id}`])
  }


  create = false;
  redirecionarFormCriarUsuario() {
    if (this.create == false) {
      this.create = true;
    } else
      this.create = false;
    console.log(this.create);
  }



  search() {
    if (this.pesquisa) {

      this.usuarios = this.usuariosOriginal
        .filter(user =>
          user.nome.toLowerCase().includes(this.pesquisa.toLowerCase())
        );

      if (this.usuarios.length === 0) {
        this.usuarios = this.usuariosOriginal;
        alert("Nenhum resultado encontrado!");
      }

    }
    else if (this.pesquisa === '') {
      this.usuarios = this.usuariosOriginal;
    }
  }



  BuscarEnderecos() {
    this.frontService.getAll("ListarEndereco", this.enderecos).subscribe(user => {
      this.enderecos = user;
      console.log(this.frontService.id_Endereco);
      console.log(user.length);
      for (let i = 0; i < this.enderecos.length; i++) {
        if (this.enderecos[i].id > this.endId) {
          this.endId = this.enderecos[i].id;
        }
      }
    });
  }

  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    })
  }


  salvar() {
    this.frontService.add(this.registerForm.value, this.usuarios, "CriarUsuario").subscribe((user => {
      this.usuarios.push(user);
      this.Buscar();
    }));
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

  OnSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    } else {
      this.salvar();
      this.router.navigate(['/'])
    }
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
ngOnInit(){}

}




