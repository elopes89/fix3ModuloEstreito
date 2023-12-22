import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { EmpresaService } from '../../services/empresa.service';
import { IEmpresa } from '../../interfaces/IEmpresa';
import { FrontService } from '../../services/front.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  registerForm!: FormGroup
  empresaId = 1
  listaEmpresas: Array<IEmpresa> = [];
  showHide = false;
  empresa = {
    nome_Empresa: '',
    slogan: '',
    paleta_Cores: '',
    logotipo_URL: '',
    demais_Infos: ''
  }
  cs = this.service.corCard
  constructor(private service: EmpresaService, private fs: FrontService, private router: Router) { }
  ngOnInit() {
    this.gerarListaValores();
      this.registerForm = new FormGroup({
        'nome': new FormControl('', [Validators.required]),

        'slogan': new FormControl('', [Validators.required]),

        'cores': new FormControl(''),

        'logo': new FormControl(''),

        'info': new FormControl(''),
      });
  }
  showForm(){
     this.showHide = !this.showHide
  }
  mensagemErro(campo: string) {
    return (this.registerForm.get(campo)?.value === null || this.registerForm.get(campo)?.value.length === 0) && this.registerForm.get(campo)?.touched
  }

  SalvarEmpresa() {
    const nomeEmpresa = this.registerForm.get('nome')?.value
    const logo = this.registerForm.get('logo')?.value
    const slogan = this.registerForm.get('slogan')?.value
    const cores = this.registerForm.get('cores')?.value
    const info = this.registerForm.get('info')?.value

    const novosDados = {
      "nome_Empresa": nomeEmpresa,
      "slogan": slogan,
      "paleta_Cores": cores.toString(),
      "logotipo_URL": logo,
      "demais_Infos": info
    }

    this.service.salvar(novosDados).subscribe(res => {
      console.log("Dados atualizados com sucesso! " + res);
      this.showHide = false;
      this.gerarListaValores();
    });
    sessionStorage.setItem('paleta', cores)
  }

  gerarListaValores() {
    this.fs.getAll("api/whitelabel", this.listaEmpresas)
      .subscribe((data) => {
        this.listaEmpresas = data
      })
  };

  redirecionarFormEditar(id: number | undefined) {
    this.router.navigate([`/private/editar-empresa/${id}`])
  }


}
