import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { RelatoriosService } from "src/app/relatorios/relatorios.service";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-relatorio-lancamentos',
  templateUrl: './relatorio-lancamentos.component.html',
  styleUrls: ['./relatorio-lancamentos.component.css']
})
export class RelatorioLancamentosComponent implements OnInit {
  dataSource: MatTableDataSource<any>;

  periodoInicio: Date;
  periodoFim: Date;


  constructor(
          private relatoriosService: RelatoriosService,
          public dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);
        console.log(this.periodoInicio);
        console.log(this.periodoFim);
        window.open(url);
      });
  }
}