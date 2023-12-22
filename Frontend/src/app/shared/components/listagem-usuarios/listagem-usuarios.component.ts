import { Component, Input } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { ListagemUsuariosService } from '../../services/listagem-usuarios.service';
import { Router } from '@angular/router';
import { FrontService } from '../../services/front.service';
import { EmpresaService } from '../../services/empresa.service';

@Component({
  selector: 'app-listagem-usuarios',
  templateUrl: './listagem-usuarios.component.html',
  styleUrls: ['./listagem-usuarios.component.css']
})
export class ListagemUsuariosComponent {
[x: string]: any;

  @Input()
  tipoUsuario: string = ''

  listaValores: any[] = []
  listaValoresFiltro: any[] = []
  titulo: string = ''
  pesquisa: string = ''
  cores = true;
  cs = sessionStorage.getItem('paleta');


  constructor(private listagemUsuariosService: ListagemUsuariosService, private route: Router,
     private enterS: EmpresaService) { }

  ngOnInit() {
    this.gerarListaValores();
  }

  gerarListaValores() {
    if (this.tipoUsuario == "Administrador") {
      this.listagemUsuariosService.getUsuarios()
        .subscribe((data) => {
          this.listaValores = data
          this.listaValoresFiltro = [...this.listaValores]
          this.titulo = "Listagem de usuários"
        })
    }
    else {
      this.listagemUsuariosService.getAlunos()
        .subscribe((data) => {
          this.listaValores = data
          this.listaValoresFiltro = [...this.listaValores]
          this.titulo = "Listagem de alunos"
        })
    }
  };

  search() {
    console.log(this.listaValores, this.listaValoresFiltro)

    if (this.pesquisa) {

      this.listaValores = this.listaValoresFiltro
        .filter(user =>
          user.nome.toLowerCase().includes(this.pesquisa.toLowerCase()) ||
          user.telefone.includes(this.pesquisa) ||
          user.cpf.includes(this.pesquisa)
        );

      if (this.listaValores.length === 0) {
        this.listaValores = this.listaValoresFiltro;
        alert("Nenhum usuário encontrado!");
      }
    }
    else if (this.pesquisa === '') {
      this.listaValores = this.listaValoresFiltro;
    }
  }

  redirecionarFormEditar(id: number | undefined) {
    this.route.navigate([`private/editar-usuario/${id}`])
  }

  redirecionarDetalhamento() {
    this.route.navigate([`/private/detalhamento-aluno`])
  }

  deletarUsuario(idUsuario: number) {
    this.listagemUsuariosService.deleteUsuario(idUsuario)
      .subscribe(() => {
        this.gerarListaValores
        this.gerarListaValores();

      },
        (error: any) => {
          console.error('Erro ao deletar usuário:', error);
        }
      );
  }
}
