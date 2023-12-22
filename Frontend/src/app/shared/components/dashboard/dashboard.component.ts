import { FrontService } from 'src/app/shared/services/front.service';
import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  quantidadeAlunos: number = 0
  usuarios: any[] = []
  quantidadeExercicios: number = 0
  quantidadeAvaliacoes: number = 0
  quantidadeAtendimentos: number = 0

  tipoUsuario: string = "Administrador"


  constructor(private dashboardService: DashboardService, private frontService: FrontService) {
    this.Buscar();
  }
  Buscar() {
    this.frontService.getAll("ListarUsuarios", this.usuarios).subscribe(user => {
      this.usuarios = user;
      console.log(user);
    })
  }


  ngOnInit() {
    this.dashboardService.getAlunos()
      .subscribe((data) => {
        this.quantidadeAlunos = data.length
      })

    this.dashboardService.getExercicios()
      .subscribe((data) => {
        this.quantidadeExercicios = data.length
      })

    this.dashboardService.getAvaliacoes()
      .subscribe((data) => {
        this.quantidadeAvaliacoes = data.length
      })

    this.dashboardService.getAtendimentos()
      .subscribe((data) => {
        this.quantidadeAtendimentos = data.length
      })
  }
}
