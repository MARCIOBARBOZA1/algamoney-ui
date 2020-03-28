import { HttpParams } from '@angular/common/http'; // URLSearchParams
import { Injectable, Input, Directive } from '@angular/core';

import * as moment from 'moment';
import 'rxjs/add/operator/toPromise';

import { ErrorHandlerService } from '../core/error-handler.service';

import { environment } from './../../environments/environment';
import { Lancamento } from "src/app/core/model";
import { MoneyHttp } from '../seguranca/money-http';

@Directive()
export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicial: Date;
  dataVencimentoFinal: Date;
  @Input() pageIndex: number;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()

export class LancamentoService {

  tmpUrl: string;

  constructor(
     private http: MoneyHttp,
     private errorHandler: ErrorHandlerService
  ) {
      this.tmpUrl = `${environment.apiUrl}/lancamentos`;
  }
  
  urlUploadAnexo(): string {
      return `${this.tmpUrl}/anexo`;
  }

  async consultar(filtro: LancamentoFiltro): Promise<any> {
    
      let params = new HttpParams({
          fromObject: {
              page: filtro.pagina.toString(),
              size: filtro.itensPorPagina.toString()
          }
    });
    
    if (filtro.descricao) {
        params = params.append('descricao', filtro.descricao);
    }
    
    if (filtro.dataVencimentoInicial) {
        params = params.append('dataVencimentoDe',
          moment(filtro.dataVencimentoInicial).format('YYYY-MM-DD'));
    }
    
    if (filtro.dataVencimentoFinal) {
        params = params.append('dataVencimentoAte',
          moment(filtro.dataVencimentoFinal).format('YYYY-MM-DD'));
    }

    return this.http.get<any>(`${this.tmpUrl}?resumo`,
      { params })
      .toPromise()
      .then(response => {
      const lancamentos = response.content;

      const resultado = {
        lancamentos,
        total: response['totalElements'],
      };
      
      return resultado;
    })
    .catch(erro => this.errorHandler.handle(erro));


  }
  
  excluir(id: String): Promise<void> {
      return this.http.delete(`${this.tmpUrl}/${id}`)
      .toPromise()
      .then(() => null)
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  adicionar(lancamento: Lancamento): Promise<Lancamento> {
      return this.http.post<Lancamento>(this.tmpUrl, lancamento)
        .toPromise();
        //.then(response => response['lancamento']); não foi necessário mais por motivo da inclusão da indicação do retorno <Lancamento> 
  }
  
  atualizar(lancamento: Lancamento): Promise<Lancamento> {
      return this.http.put<Lancamento>(`${this.tmpUrl}/${lancamento.id}`, lancamento)
        .toPromise()
        .then(response => {
          const lancamentoAlterado = response;
          return lancamentoAlterado;
        });
    }

  buscarPorCodigo(id: string): Promise<Lancamento> {
      return this.http.get<Lancamento>(`${this.tmpUrl}/${id}`)
      .toPromise();
  }
  
}
