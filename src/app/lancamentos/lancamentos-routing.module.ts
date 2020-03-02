import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { LancamentoFormComponent } from "src/app/lancamentos/lancamento-form/lancamento-form.component";
import { LancamentoCadastroComponent } from "src/app/lancamentos/lancamento-cadastro/lancamento-cadastro.component";


const routes: Routes = [
      { path: 'lancamentos', component: LancamentoFormComponent },
      { path: 'lancamentos/novo', component: LancamentoCadastroComponent },
      { path: 'lancamentos/:id', component: LancamentoCadastroComponent }
];

@NgModule({
  imports: [
     RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})

export class LancamentosRoutingModule { }