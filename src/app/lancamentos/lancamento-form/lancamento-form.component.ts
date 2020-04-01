import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Title } from '@angular/platform-browser';

import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from "src/app/shared/dialog/dialog.component";

import { ErrorHandlerService } from './../../core/error-handler.service';
import { AuthService } from "src/app/seguranca/auth.service";


@Component({
  selector: 'app-lancamento-form',
  templateUrl: './lancamento-form.component.html',
  styleUrls: ['./lancamento-form.component.css']
})
export class LancamentoFormComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];

  constructor(
          private lancamentoService: LancamentoService,
          private _snackBar: MatSnackBar,
          public dialog: MatDialog,
          private errorHandler: ErrorHandlerService,
          private title: Title,
          public auth: AuthService,
          ) { }

  ngOnInit() {
    this.consultar();
    this.title.setTitle('Pesquisa de lançamentos');
    //this.dataSource.paginator = this.paginator;
  }

  consultar(pageIndex = 0) {
    this.filtro.pageIndex = pageIndex;
    this.lancamentoService.consultar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.lancamentos = resultado.lancamentos;
        this.dataSource = new MatTableDataSource<any>(this.lancamentos);
        })
        .catch(erro => this.errorHandler.handle(erro));

  }

  displayedColumns: string[] = ['pessoa', 'tipo', 'descricao', 'dataVencimento', 'dataPagamento', 'valor', 'star'];
  
  
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  confirmExclusao(id: any ) {
      const dialogRef = this.dialog.open(DialogComponent, {
          width: '350px',
          data: 'Por favor, confirmar a exclusão!'
      });
      dialogRef.afterClosed().subscribe(res => {
          if (res) {
              this.excluir(id);
          } else {
              console.log('Erro: Registro não deletado!')
          }
      })
  };
  
  excluir(id: any) {
      this.lancamentoService.excluir(id)
        .then(() => {
          this.consultar();
          this._snackBar.open('Excluída com sucesso!','', {
              duration: 2000
          });
        })
        .catch(erro => this.errorHandler.handle(erro));

  }
  
}
