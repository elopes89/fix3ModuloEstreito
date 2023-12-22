import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IEndereco } from 'src/app/shared/interfaces/IEndereco';
import { IUsuario } from 'src/app/shared/interfaces/IUsuario';
import { FrontService } from 'src/app/shared/services/front.service';

@Component({
  selector: 'app-form-editar-usuario',
  templateUrl: './form-editar-usuario.component.html',
  styleUrls: ['./form-editar-usuario.component.css']
})
export class FormEditarUsuarioComponent {

  @Input() usuarioData: IUsuario | null = null;

  enderecos: Array<IEndereco> = [];
  submitted = false;
  disBotao = this.frontService.atvBotao;
  usuarios!: IUsuario;
  endId = 0;
  permissao = sessionStorage.getItem('userTipo');
  constructor(private formBuilder: FormBuilder, private frontService: FrontService,
    private active: ActivatedRoute, private router: Router) {

  }

  ngOnInit(): void {
    const id = Number(this.active.snapshot.paramMap.get('id'))
    this.frontService.getId(id, `api/usuarios`, this.usuarios).subscribe(item => {
      this.usuarios = item;
      this.frontService.atvBotao = true;
      console.log(this.usuarios);
    });
  }
}

