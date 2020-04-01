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
      console.log('ssssssss');
      return this.http.get(`${this.tmpUrl}/estatisticas/por-categoria`)
          .toPromise()
          .then(response => response as Array<any>);
  }

  async lancamentosPorDia(): Promise<Array<any>> {
    return this.http.get<any>(`${this.tmpUrl}/estatisticas/por-dia`)
      .toPromise()
      .then(response => {
        const datas = response;
        this.converterStringsParaDatas(datas);
        return datas;
      });
  }

  private converterStringsParaDatas(datas: Array<any>) {
    for (const d of datas) {
      d.dia = moment(d.dia, 'YYYY-MM-DD').toDate();
    }
  }
  
}