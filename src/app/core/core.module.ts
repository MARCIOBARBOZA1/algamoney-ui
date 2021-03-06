import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from "src/app/core/error-handler.service";

import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http'
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';
import { AuthService } from "src/app/seguranca/auth.service";
import { MoneyHttp } from "src/app/seguranca/money-http";
import { CategoriaService } from "src/app/categorias/categoria.service";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { RelatoriosService } from "src/app/relatorios/relatorios.service";

registerLocaleData(localePt);

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    RouterModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,

    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    NavbarComponent,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    CategoriaService,
    DashboardService,
    RelatoriosService,
    ErrorHandlerService,
    AuthService,
    MoneyHttp,
    JwtHelperService,
    
    Title,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
