import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from "@angular/material/paginator";

import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { CategoriaFiltro, CategoriaService } from "src/app/categorias/categoria.service";

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  totalRegistros = 0;
  filtro = new CategoriaFiltro();
  categorias = [];

  constructor(
          private categoriaService: CategoriaService,
          private _snackBar: MatSnackBar,
          public dialog: MatDialog,
          private errorHandler: ErrorHandlerService
          ) { }

  ngOnInit() {
    this.consultar();
  }

  consultar(pageIndex = 0) {
    console.log('chegou aqui');
    this.filtro.pageIndex = pageIndex;
    this.categoriaService.consultar(this.filtro)
      .then(resultado => {
        console.log('categorias: '+resultado.categorias);
        this.categorias = resultado.categorias;
        this.dataSource = new MatTableDataSource<any>(this.categorias);
        })
        .catch(erro => this.errorHandler.handle(erro));

  }
  
  /*
  listarTodas() {
      this.categoriaService.listarTodas()
      .then(resultado => { resultado.categorias;
      this.dataSource = new MatTableDataSource<any>(this.categorias);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  */

  displayedColumns: string[] = ['nome', 'star'];
  
  
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
      this.categoriaService.excluir(id)
        .then(() => {
          this.consultar();
          this._snackBar.open('Excluído com sucesso!','', {
              duration: 2000
          });
        })
        .catch(erro => this.errorHandler.handle(erro));

  }
  
}
