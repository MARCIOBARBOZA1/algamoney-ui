import { Injectable, Input, Directive } from '@angular/core';
import { HttpParams, HttpHeaders } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import { ErrorHandlerService } from '../core/error-handler.service';
import { Pessoa } from "src/app/core/model";
import { MoneyHttp } from "src/app/seguranca/money-http";
import { environment } from "src/environments/environment";

@Directive()
export class PessoaFiltro {
  nome: string;
  ativo: boolean;
  @Input() pageIndex: number;
  pagina = 0;
  itensPorPagina = 5
}

@Injectable()
export class PessoaService {

    pessoasUrl: string;
    cidadesUrl: string;
    estadosUrl: string;

  constructor(
      private http: MoneyHttp,
      private errorHandler: ErrorHandlerService

  ) {
      this.pessoasUrl = `${environment.apiUrl}/pessoas`;
      this.estadosUrl = `${environment.apiUrl}/estados`;
      this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }
  
  async consultar(filtro: PessoaFiltro): Promise<any> {
    let params = new HttpParams({
        fromObject: {
            page: filtro.pagina.toString(),
            size: filtro.itensPorPagina.toString()
        }
    });

    if (filtro.nome) {
        params = params.append('nome', filtro.nome);
    }

    if (filtro.ativo) {
        params = params.append('ativo', filtro.ativo.toString());
    }

    return this.http.get<any>(`${this.pessoasUrl}?resumo`, { params })
        .toPromise()
        .then(response => {
        const pessoas = response.content;
   
        const resultado = {
          pessoas,
          total: response['totalElements'],
        };
        
        return resultado;
        
      })
      .catch(erro => this.errorHandler.handle(erro));

  }

  excluir(id: String): Promise<void> {
      return this.http.delete(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(() => null)
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  adicionar(pessoa: Pessoa): Promise<Pessoa> {
      return this.http.post<Pessoa>(this.pessoasUrl, pessoa)
          .toPromise();
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {
      return this.http.put<Pessoa>(`${this.pessoasUrl}/${pessoa.id}`, pessoa)
        .toPromise()
        .then(response => {
          const pessoaAlterada = response;
          return pessoaAlterada;
        });
  }
  
  buscarPorCodigo(id: string): Promise<Pessoa> {
      return this.http.get<Pessoa>(`${this.pessoasUrl}/${id}`)
      .toPromise();
  }
      
  listarTodas(): Promise<any> {

      return this.http.get<any>(this.pessoasUrl)
        .toPromise();
  }
  
  mudarStatus(id: String, ativo: boolean): Promise<void> {
      const headers = new HttpHeaders()
          .append('Content-Type', 'application/json');  
      
      return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo, { headers } )
      .toPromise()
      .then(() => null) 
  }
  
}
