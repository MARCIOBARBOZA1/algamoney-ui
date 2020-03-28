import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { PessoaCadastroComponent } from "src/app/pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PessoaFormComponent } from "src/app/pessoas/pessoa-form/pessoa-form.component";
import { AuthGuard } from "src/app/seguranca/auth.guard";


const routes: Routes = [
    {
        path: 'pessoas',
        component: PessoaFormComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_PESSOA'] }
      },
      {
        path: 'pessoas/nova',
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
      },
      {
        path: 'pessoas/:id',
        component: PessoaCadastroComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_CADASTRAR_PESSOA'] }
      }
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})

export class PessoasRoutingModule { }