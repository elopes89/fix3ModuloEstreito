import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-empresa',
  templateUrl: './empresa.component.html',
  styleUrls: ['./empresa.component.css']
})
export class EmpresaComponent {

  editarForm: FormGroup
  empresaId = 1

  empresa = {
    nome_Empresa: '',
    slogan:  '',
    paleta_Cores: '',
    logotipo_URL: '',
    demais_Infos: '' 
  }

  constructor(private service: EmpresaService,
    private router: Router) {

    // Formulário
    this.editarForm = new FormGroup({
      'nome': new FormControl('', [Validators.required]),

      'slogan': new FormControl('', [Validators.required]),

      'cores': new FormControl(''),

      'logo': new FormControl(''),

      'info': new FormControl(''),
    });
  }

  ngOnInit(){
    this.getEmpresa(this.empresaId)
  }
  // Pegando os dados da empresa
  getEmpresa(id: number){
    this.service.getEmpresa(id)
      .subscribe((result) => {
        this.empresa = result
        console.log(this.empresa)
        this.editarForm.patchValue({
          'nome': this.empresa.nome_Empresa,
          'logo': this.empresa.logotipo_URL,
          'cores': this.empresa.paleta_Cores,
          'info': this.empresa.demais_Infos,
          'slogan': this.empresa.slogan
        })
      })
  }


  // Validação dos campo
  mensagemErro(campo: string) {
    return (this.editarForm.get(campo)?.value === null || this.editarForm.get(campo)?.value.length === 0) && this.editarForm.get(campo)?.touched
  }

  // Submit
  editarEmpresa(){
    const nomeEmpresa = this.editarForm.get('nome')?.value
    const logo = this.editarForm.get('logo')?.value
    const slogan = this.editarForm.get('slogan')?.value
    const cores = this.editarForm.get('cores')?.value
    const info = this.editarForm.get('info')?.value

    const novosDados = {
      "nome_Empresa": nomeEmpresa,
      "slogan":  slogan,
      "paleta_Cores": cores,
      "logotipo_URL": logo,
      "demais_Infos": info 
    }

    this.service.updateEmpresa(this.empresaId, novosDados)
      .subscribe((result) => {
        console.log(result)
        alert("Dados atualizados com sucesso!")
      })
  }
}
