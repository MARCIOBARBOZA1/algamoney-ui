import { Component, OnInit } from '@angular/core';
import { DashboardService } from "src/app/dashboard/dashboard.service";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { AuthService } from "src/app/seguranca/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    
  pieChartData: any;
  lineChartData: any;

  title = 'Por Categoria';
  type = 'PieChart';
  data: Array<Array<string | number>>; 
  columnNames= [];
  options = {    
  };
  width = 550;
  height = 400;
  
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
      this.configurarGraficoPizza();
      this.configurarGraficoLinha();
  }
  
  init(): void {
      if(typeof(google) !== 'undefined') {
          google.charts.load('current', {'packages':['data']});
      }
  }
  
  configurarGraficoPizza() {
      this.dashboardService.lancamentosPorCategoria()
        .then(datas => {
          this.pieChartData = {
            columnNames: datas.map(data => data.categoria.nome),
            datasets: [
              {
                data: datas.map(data => data.total),
                options: {colors: ['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6'], is3D: true}
              }
            ],
            title: "Por Categoria",
          }; 
        });
  }
  
  configurarGraficoLinha() {
      this.dashboardService.lancamentosPorDia()
        .then(dados => {
          const diasDoMes = this.configurarDiasMes();
          const totaisReceitas = this.totaisPorCadaDiaMes(
            dados.filter(dado => dado.tipo === 'RECEITA'), diasDoMes);
          const totaisDespesas = this.totaisPorCadaDiaMes(
            dados.filter(dado => dado.tipo === 'DESPESA'), diasDoMes);

          this.lineChartData = {
            labels: diasDoMes,
            datasets: [
              {
                label: 'Receitas',
                data: totaisReceitas,
                borderColor: '#3366CC'
              }, {
                label: 'Despesas',
                data: totaisDespesas,
                borderColor: '#D62B00'
              }
            ]
          }
        });
  }

  private totaisPorCadaDiaMes(dados, diasDoMes) {
      const totais: number[] = [];
      for (const dia of diasDoMes) {
        let total = 0;

        for (const dado of dados) {
          if (dado.dia.getDate() === dia) {
            total = dado.total;

            break;
          }
        }

        totais.push(total);
      }

      return totais;
  }

  private configurarDiasMes() {
      const mesReferencia = new Date();
      mesReferencia.setMonth(mesReferencia.getMonth() + 1);
      mesReferencia.setDate(0);

      const quantidade = mesReferencia.getDate();

      const dias: number[] = [];

      for (let i = 1; i <= quantidade; i++) {
        dias.push(i);
      }

      return dias;
  }

}
