import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import * as moment from 'moment';

import { ErrorHandlerService } from '../core/error-handler.service';

export class CategoriaFiltro {
  nome: string;
  @Input() pageIndex: number;
  itemPorPagina = 5;
}

@Injectable({
    providedIn: 'root'
})

export class CategoriaService {

  tmpUrl = 'http://localhost:8080/categorias';

  constructor(
              private http: HttpClient,
              private errorHandler: ErrorHandlerService
              ) { }

  async consultar(filtro: CategoriaFiltro): Promise<any> {
    const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
    let params = new HttpParams();
    
    if (filtro.nome) {
        params = params.set('nome', filtro.nome);
    }
     
    return this.http.get(`${this.tmpUrl}`,
        { headers, params })
        .toPromise()
        .then(response => {
        const categorias = response['content']
        return categorias;
        
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  
  listarTodas(): Promise<any> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

      return this.http.get(this.tmpUrl, { headers })
      .toPromise()
      .then(response => response );
  }
  
  excluir(id: String): Promise<void> {
      const headers = new HttpHeaders().append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');
      return this.http.delete(`${this.tmpUrl}/${id}`, { headers })
      .toPromise()
      .then(() => null)
      .catch(erro => this.errorHandler.handle(erro));
  }
  
}
