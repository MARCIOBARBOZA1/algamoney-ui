import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from "src/app/app.component";
import { CoreModule } from "src/app/core/core.module";
import { SharedModule } from "src/app/shared/shared.module";
import { CategoriasModule } from "src/app/categorias/categorias.module";
import { PessoasModule } from "src/app/pessoas/pessoas.module";
import { LancamentosModule } from "src/app/lancamentos/lancamentos.module";
import { AppRoutingModule } from "src/app/app-routing.module";
import { SegurancaModule } from "src/app/seguranca/seguranca-module";
import { DashboardModule } from "src/app/dashboard/dashboard.module";
import { RelatoriosModule } from "src/app/relatorios/relatorios.module";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,

    CoreModule,
    SharedModule,
    
    CategoriasModule,
    PessoasModule,
    LancamentosModule,
    SegurancaModule,
    DashboardModule,
    RelatoriosModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
