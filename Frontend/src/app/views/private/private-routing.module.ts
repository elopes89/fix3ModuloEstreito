import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrivateComponent } from './private.component';
import { EmpresaComponent } from 'src/app/shared/components/empresa/empresa.component';
import { UsuarioComponent } from 'src/app/shared/components/usuarios/usuario.component';
import { AtendimentosComponent } from 'src/app/shared/components/atendimentos/atendimentos.component';
import { ExerciciosComponent } from 'src/app/shared/components/exercicios/exercicios.component';
import { DashboardComponent } from 'src/app/shared/components/dashboard/dashboard.component';
import { DetalhamentoAlunoComponent } from 'src/app/shared/components/detalhamento-aluno/detalhamento-aluno.component';
import { FormEditarAtendimentoComponent } from 'src/app/shared/components/form-editar-atendimento/form-editar-atendimento.component';
import { FormCriarAtendimentoComponent } from 'src/app/shared/components/form-criar-atendimento/form-criar-atendimento.component';
import { FormEditarExercicioComponent } from 'src/app/shared/components/form-editar-exercicio/form-editar-exercicio.component';
import { FormCriarExercicioComponent } from 'src/app/shared/components/form-criar-exercicio/form-criar-exercicio.component';
import { FormEditarUsuarioComponent } from 'src/app/shared/components/form-editar-usuario/form-editar-usuario.component';


const routes: Routes = [
  {
    path: '', component: PrivateComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'empresa', component: EmpresaComponent },
      { path: 'usuarios', component: UsuarioComponent },
      { path: 'atendimentos', component: AtendimentosComponent },
      { path: 'editar-atendimento/:id', component: FormEditarAtendimentoComponent},
      { path: 'criar-atendimento', component: FormCriarAtendimentoComponent},
      { path: 'exercicios', component: ExerciciosComponent },
      { path: 'editar-exercicio/:id', component: FormEditarExercicioComponent},
      { path: 'criar-exercicio', component: FormCriarExercicioComponent},
      { path: 'detalhamento-aluno', component: DetalhamentoAlunoComponent},
      {path: 'editar-usuario/:id', component: FormEditarUsuarioComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrivateRoutingModule { }
