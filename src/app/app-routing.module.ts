import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LancamentoFormComponent } from "src/app/lancamentos/lancamento-form/lancamento-form.component";
import { LancamentoCadastroComponent } from "src/app/lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { PessoaFormComponent } from "src/app/pessoas/pessoa-form/pessoa-form.component";
import { PessoaCadastroComponent } from "src/app/pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PaginaNaoEncontradaComponent } from "src/app/core/pagina-nao-encontrada.component";

const routes: Routes = [
      { path: '', redirectTo: 'lancamentos', pathMatch: 'full' },
      { path: 'pessoas', component: PessoaFormComponent },
      { path: 'pessoas/novo', component: PessoaCadastroComponent },
      { path: 'pessoas/:id', component: PessoaCadastroComponent },
      { path: 'pagina-nao-encontrada', component: PaginaNaoEncontradaComponent },
      { path: '**', redirectTo: 'pagina-nao-encontrada' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }