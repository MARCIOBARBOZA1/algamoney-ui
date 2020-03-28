import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LancamentoFormComponent } from "src/app/lancamentos/lancamento-form/lancamento-form.component";
import { LancamentoCadastroComponent } from "src/app/lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { AuthGuard } from "src/app/seguranca/auth.guard";


const routes: Routes = [
      { 
          //path: '', Era para usar o Lazy Loading
          path: 'lancamentos',
          component: LancamentoFormComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
      },
      { 
          //path: 'novo', era para usar o Lazy Loading
          path: 'lancamentos/novo',
          component: LancamentoCadastroComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
      },
      { 
          //path: ':id', era para usar o Lazy Loading
          path: 'lancamentos/:id',
          component: LancamentoCadastroComponent,
          canActivate: [AuthGuard],
          data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
      }
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})

export class LancamentosRoutingModule { }