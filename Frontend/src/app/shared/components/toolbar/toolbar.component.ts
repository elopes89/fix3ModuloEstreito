import { Component } from '@angular/core';
import { EmpresaService } from '../../services/empresa.service';
import { DetalhamentoAlunoService } from '../../services/detalhamento-aluno.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent {

  nomeEmpresa: string = ''
  logo: string = ''
  usuaris = sessionStorage.getItem('userNome');

  constructor(private empresaService: EmpresaService, private ac: ActivatedRoute,
    private userService: DetalhamentoAlunoService) { }

  ngOnInit() {
    this.getDadosEmpresa();
  }

  getDadosEmpresa() {
    const id = Number(this.ac.snapshot.paramMap.get('id'));
    this.empresaService.getEmpresa(id)
      .subscribe((result) => {
        this.nomeEmpresa = result.nome_Empresa
        this.logo = result.logotipo_URL
      })
  }
}
