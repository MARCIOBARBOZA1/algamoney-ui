import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from "src/app/seguranca/auth.guard";
import { RelatorioLancamentosComponent } from "src/app/relatorios/relatorio-lancamentos/relatorio-lancamentos.component";


const routes: Routes = [
    { 
        path: 'relatorios/lancamentos',
        component: RelatorioLancamentosComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RelatoriosRoutingModule { }
