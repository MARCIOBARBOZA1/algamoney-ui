import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatButtonModule } from '@angular/material';
import { registerLocaleData } from '@angular/common';
import localePt from '@angular/common/locales/pt';

import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from "src/app/core/error-handler.service";

import { PessoaService } from '../pessoas/pessoa.service';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { RouterModule } from "@angular/router";
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { Title } from '@angular/platform-browser';

registerLocaleData(localePt);

@NgModule({
  declarations: [NavbarComponent, PaginaNaoEncontradaComponent],
  imports: [
    CommonModule,
    RouterModule,

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
    ErrorHandlerService,
    
    Title,

    { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
