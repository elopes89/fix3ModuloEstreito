import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-editar-empresa',
  templateUrl: './editar-empresa.component.html',
  styleUrls: ['./editar-empresa.component.css']
})
export class EditarEmpresaComponent {

  editarForm!: FormGroup

  empresa = {
    nome_Empresa: '',
    slogan: '',
    paleta_Cores: '',
    logotipo_URL: '',
    demais_Infos: ''
  }
  constructor(private service: EmpresaService, private ac: ActivatedRoute,
    private router: Router) {
    this.editarForm = new FormGroup({
      'nome': new FormControl('', [Validators.required]),

      'slogan': new FormControl('', [Validators.required]),

      'cores': new FormControl(''),

      'logo': new FormControl(''),

      'info': new FormControl(''),
    });
  }

  ngOnInit() {
    const ac = Number(this.ac.snapshot.paramMap.get('id'));
    this.getEmpresa(ac)
  }
  getEmpresa(id: number) {
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

  mensagemErro(campo: string) {
    return (this.editarForm.get(campo)?.value === null || this.editarForm.get(campo)?.value.length === 0) && this.editarForm.get(campo)?.touched
  }

  editarEmpresa() {
    const ac = Number(this.ac.snapshot.paramMap.get('id'));
    const nomeEmpresa = this.editarForm.get('nome')?.value
    const logo = this.editarForm.get('logo')?.value
    const slogan = this.editarForm.get('slogan')?.value
    const cores = this.editarForm.get('cores')?.value
    const info = this.editarForm.get('info')?.value

    const novosDados = {
      "nome_Empresa": nomeEmpresa,
      "slogan": slogan,
      "paleta_Cores": cores.toString(),
      "logotipo_URL": logo,
      "demais_Infos": info
    }

    this.service.updateEmpresa(ac, novosDados)
      .subscribe((result) => {
        console.log(result)
        this.router.navigate(['/private/empresa'])
      });
  }
}
