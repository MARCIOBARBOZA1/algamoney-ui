import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";

import * as moment from 'moment';


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
    
    tmpUrl: string;

constructor(private http: HttpClient) {
    this.tmpUrl = `${environment.apiUrl}/lancamentos`;
  }

  async lancamentosPorCategoria(): Promise<Array<any>> {
      return this.http.get(`${this.tmpUrl}/estatisticas/por-categoria`)
          .toPromise()
          .then(response => response as Array<any>);
  }

  async lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<any>(`${this.tmpUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const dados = response;
        this.converterStringsParaDatas(dados);
        return dados;
      });
  }

  private converterStringsParaDatas(dados: Array<any>) {
    for (const dado of dados) {
      dado.dia = moment(dado.dia, 'YYYY-MM-DD').toDate();
    }
  }
  
}