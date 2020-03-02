import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Pessoa } from "src/app/core/model";

export class PessoaFiltro {
  nome: string;
  ativo: boolean;
  @Input() pageIndex: number;
  itemPorPagina = 5;
}

@Injectable({
    providedIn: 'root'
})

export class PessoaService {

  tmpUrl = 'http://localhost:8080/pessoas';

  constructor(
              private http: HttpClient,
              private errorHandler: ErrorHandlerService
              ) { }
  
  // Headers
  httpOptions = {
    headers: new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
                              .append('Content-Type', 'application/json')
  }

  async consultar(filtro: PessoaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();
    
    params.set('page', filtro.pageIndex.toString());
    params.set('size', filtro.itemPorPagina.toString());

    if (filtro.nome) {
        params = params.set('nome', filtro.nome);
    }

    if (filtro.ativo) {
        params = params.set('ativo', filtro.ativo.toString());
    }

    return this.http.get(`${this.tmpUrl}?resumo`,
        { headers, params })
        .toPromise()
        .then(response => {
        const pessoas = response['content']
   
        const resultado = {
          pessoas,
          total: response['totalElements'],
        };
        
        return resultado;
        
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  
  listarTodas(): Promise<any> {

      return this.http.get(this.tmpUrl, this.httpOptions)
        .toPromise()
        .then(response => response);
  }
  
  excluir(id: String): Promise<void> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      return this.http.delete(`${this.tmpUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  mudarStatus(id: String, ativo: boolean): Promise<void> {
      let headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==').append('Content-Type', 'application/json');      
      
      return this.http.put(`${this.tmpUrl}/${id}/ativo`, ativo, { headers })
      .toPromise()
      .then(() => null) 
  }
  
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new HttpHeaders()
          .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
          .append('Content-Type', 'application/json');
      
      return this.http.post<Pessoa>(
             this.tmpUrl, pessoa, {headers}).toPromise()
             .then(response => response['pessoa']);
  }
  
  atualizar(pessoa: Pessoa): Promise<Pessoa> {
      const headers = new HttpHeaders()
      .append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      .append('Content-Type', 'application/json');

      return this.http.put(`${this.tmpUrl}/${pessoa.id}`,
        (pessoa), { headers })
        .toPromise()
        .then(response => {
          const pessoaAlterada = response['pessoa'] as Pessoa;

          //this.converterStringsParaDatas([pessoaAlterada]);
          console.log('Pessoa Alterada: '+pessoaAlterada);
          return pessoaAlterada;
        });
  }
  
  buscarPorCodigo(id: string): Promise<Pessoa> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==')
      return this.http.get(`${this.tmpUrl}/${id}`, { headers })
              .toPromise()
              .then(response => {
              const pessoa = response['pessoa']
              console.log('Chegou aqui');
              console.log(pessoa);
              return pessoa;
            })
            .catch(erro => this.errorHandler.handle(erro));
  }
  
}
