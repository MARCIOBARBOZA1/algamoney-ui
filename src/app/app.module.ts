import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';

import { AppComponent } from './app.component';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { CoreModule } from './core/core.module';
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriasModule } from "src/app/categorias/categorias.module";
import { LancamentoFormComponent } from "src/app/lancamentos/lancamento-form/lancamento-form.component";
import { LancamentoCadastroComponent } from "src/app/lancamentos/lancamento-cadastro/lancamento-cadastro.component";
import { PessoaFormComponent } from "src/app/pessoas/pessoa-form/pessoa-form.component";
import { PessoaCadastroComponent } from "src/app/pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { PaginaNaoEncontradaComponent } from "src/app/core/pagina-nao-encontrada.component";
import { AppRoutingModule } from "src/app/app-routing.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,

    CoreModule,
    SharedModule,
    
    PessoasModule,
    LancamentosModule,
    CategoriasModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }