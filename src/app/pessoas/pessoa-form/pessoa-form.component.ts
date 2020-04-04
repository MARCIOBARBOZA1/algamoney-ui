import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

import { config } from "rxjs";

import { ErrorHandlerService } from './../../core/error-handler.service';
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-pessoa-form',
  templateUrl: './pessoa-form.component.html',
  styleUrls: ['./pessoa-form.component.css']
})
export class PessoaFormComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(
          private pessoaService: PessoaService,
          private _snackBar: MatSnackBar,
          public dialog: MatDialog,
          private errorHandler: ErrorHandlerService,
          private title: Title
          ) { }

  ngOnInit() {
    this.consultar();
    this.title.setTitle('Pesquisa de pessoas');
  }

  consultar(pageIndex = 0) {
    this.filtro.pageIndex = pageIndex;
    this.pessoaService.consultar(this.filtro)
      .then(resultado => {
        this.totalRegistros = resultado.total;
        this.pessoas = resultado.pessoas;
        this.dataSource = new MatTableDataSource<any>(this.pessoas);
        })
        .catch(erro => this.errorHandler.handle(erro));

  }

  displayedColumns: string[] = ['nome', 'cidade', 'estado', 'ativo', 'star'];
  
  
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
      this.pessoaService.excluir(id)
        .then(() => {
          this.consultar();
          this._snackBar.open('Excluído com sucesso!','', {
              duration: 2000
          });
        })
        .catch(erro => this.errorHandler.handle(erro));

  }
  
  alternarStatus(pessoa: any): void {
      const novoStatus = !pessoa.ativo;
          
      this.pessoaService.mudarStatus(pessoa.id, novoStatus)
        .then(() => {
          const acao = novoStatus ? 'ativada' : 'desativada';

          pessoa.ativo = novoStatus;
          this._snackBar.open(`Pessoa ${acao} com sucesso!`,'', {
              duration: 2000
          });
          
        })
        .catch(erro => this.errorHandler.handle(erro));
    }
  
}