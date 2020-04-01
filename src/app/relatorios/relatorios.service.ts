import { Injectable } from '@angular/core';

import * as moment from 'moment';

import { environment } from './../../environments/environment';
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable()
export class RelatoriosService {

  tmpUrl: string;

  constructor(private http: HttpClient) {
    this.tmpUrl = `${environment.apiUrl}/lancamentos`;
  }

  relatorioLancamentosPorPessoa(inicio: Date, fim: Date) {
      let params = new HttpParams();

      params = params.set('inicio', moment(inicio).format('YYYY-MM-DD'));
      params = params.set('fim', moment(fim).format('YYYY-MM-DD'));

      return this.http.get(`${this.tmpUrl}/relatorios/por-pessoa`,
              { params, responseType: 'blob' })
              .toPromise()
              .then(response => response);
  }

}