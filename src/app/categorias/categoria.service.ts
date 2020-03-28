import { HttpParams } from '@angular/common/http';
import { Injectable, Input, Directive } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import { environment } from './../../environments/environment';
import { MoneyHttp } from '../seguranca/money-http'; 

import { ErrorHandlerService } from '../core/error-handler.service';

@Directive()
export class CategoriaFiltro {
  nome: string;
  @Input() pageIndex: number;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable()
export class CategoriaService {

  tmpUrl: string;

  constructor(
      private http: MoneyHttp,
      private errorHandler: ErrorHandlerService
  ) { 
      this.tmpUrl = `${environment.apiUrl}/categorias`;
  }

  async consultar(filtro: CategoriaFiltro): Promise<any> {
    let params = new HttpParams();
    
    if (filtro.nome) {
        params = params.append('nome', filtro.nome);
    }
    
    return this.http.get<any>(`${this.tmpUrl}`, { params })
        .toPromise()
        .then(response => {
        const categorias = response.content;
        return categorias;
        
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  
  listarTodas(): Promise<any> {
      return this.http.get<any>(this.tmpUrl)
      .toPromise();
  }
  
  excluir(id: String): Promise<void> {
      return this.http.delete(`${this.tmpUrl}/${id}`)
      .toPromise()
      .then(() => null)
      .catch(erro => this.errorHandler.handle(erro));
  }
  
}
