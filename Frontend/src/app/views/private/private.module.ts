import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from '../../shared/components/menu/menu.component';
import { ToolbarComponent } from '../../shared/components/toolbar/toolbar.component';
import { PrivateRoutingModule } from './private-routing.module';
import { RouterModule } from '@angular/router';
import { PrivateComponent } from './private.component';
import { EmpresaComponent } from '../../shared/components/empresa/empresa.component';
import { UsuarioComponent } from '../../shared/components/usuarios/usuario.component'
import { FormCriarUsuarioComponent } from '../../shared/components/form-criar-usuario/form-criar-usuario.component';
import { FormEditarUsuarioComponent } from '../../shared/components/form-editar-usuario/form-editar-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { AtendimentosComponent } from 'src/app/shared/components/atendimentos/atendimentos.component';
import { ExerciciosComponent } from 'src/app/shared/components/exercicios/exercicios.component';
import { FormCriarExercicioComponent } from 'src/app/shared/components/form-criar-exercicio/form-criar-exercicio.component';
import { FormEditarExercicioComponent } from 'src/app/shared/components/form-editar-exercicio/form-editar-exercicio.component';
import { ListagemUsuariosComponent } from 'src/app/shared/components/listagem-usuarios/listagem-usuarios.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { DetalhamentoAlunoComponent } from 'src/app/shared/components/detalhamento-aluno/detalhamento-aluno.component';
import { FormCriarAtendimentoComponent } from 'src/app/shared/components/form-criar-atendimento/form-criar-atendimento.component';
import { FormEditarAtendimentoComponent } from 'src/app/shared/components/form-editar-atendimento/form-editar-atendimento.component';

@NgModule({
  declarations: [
    PrivateComponent,
    MenuComponent,
    ToolbarComponent,
    EmpresaComponent,
    UsuarioComponent,
    FormCriarUsuarioComponent,
    FormEditarUsuarioComponent,
    AtendimentosComponent,
    FormEditarAtendimentoComponent,
    ExerciciosComponent,
    FormCriarExercicioComponent,
    FormEditarExercicioComponent,
    ListagemUsuariosComponent,
    DashboardComponent,
    DetalhamentoAlunoComponent,
    FormCriarAtendimentoComponent
  ],
  providers: [provideNgxMask()],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule,
    PrivateRoutingModule, NgxMaskDirective, NgxMaskPipe,
    RouterModule
  ]
})
export class PrivateModule { }
