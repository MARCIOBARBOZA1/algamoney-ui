import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Lancamento } from "src/app/core/model";

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicial: Date;
  dataVencimentoFinal: Date;
  @Input() pageIndex: number;
  itemPorPagina = 5;
}

@Injectable()

export class LancamentoService {

  tmpUrl = 'http://localhost:8080/lancamentos';

  constructor(
              private http: HttpClient,
              private errorHandler: ErrorHandlerService
              ) { }

  async consultar(filtro: LancamentoFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();
    
    params.set('page', filtro.pageIndex.toString());
    params.set('size', filtro.itemPorPagina.toString());

    if (filtro.descricao) {
        params = params.set('descricao', filtro.descricao);
    }
    
    if (filtro.dataVencimentoInicial) {
        params = params.set('dataVencimentoDe',
          moment(filtro.dataVencimentoInicial).format('YYYY-MM-DD'));
    }
    
    if (filtro.dataVencimentoFinal) {
        params = params.set('dataVencimentoAte',
          moment(filtro.dataVencimentoFinal).format('YYYY-MM-DD'));
    }

    return this.http.get(`${this.tmpUrl}?resumo`,
      { headers, params })
      .toPromise()
      .then(response => {
      const lancamentos = response['content']

      const resultado = {
        lancamentos,
        total: response['totalElements'],
      };
      
      return resultado;
    })
    .catch(erro => this.errorHandler.handle(erro));


  }
  
  excluir(id: String): Promise<void> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      console.log("Id:"+{id})
      return this.http.delete(`${this.tmpUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  adicionar(lancamento: Lancamento): Promise<Lancamento> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                                       .append('Content-Type', 'application/json');
      console.log(lancamento);
      return this.http.post<Lancamento>(
              this.tmpUrl, lancamento, {headers})
          .toPromise()
        .then(response => response['lancamento']);
  }
  
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return this.http.put(`${this.tmpUrl}/${lancamento.id}`,
        (lancamento), { headers })
        .toPromise()
        .then(response => {
          const lancamentoAlterado = response as Lancamento;

          this.converterStringsParaDatas([lancamentoAlterado]);

          return lancamentoAlterado;
        });
    }

  buscarPorCodigo(id: string): Promise<Lancamento> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.get(`${this.tmpUrl}/${id}`, { headers })
      .toPromise()
      .then(response => {
        const lancamento = response as Lancamento;

        //this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }
  
  private converterStringsParaDatas(lancamentos: Lancamento[]) {
      //console.log(lancamentos);
      /*
      for (const lancamento of lancamentos) {
        lancamento.dataVencimento = moment(lancamento.dataVencimento,
          'YYYY-MM-DD').toDate();

        if (lancamento.dataPagamento) {
          lancamento.dataPagamento = moment(lancamento.dataPagamento,
            'YYYY-MM-DD').toDate();
        }
      }
      */
  }

}
