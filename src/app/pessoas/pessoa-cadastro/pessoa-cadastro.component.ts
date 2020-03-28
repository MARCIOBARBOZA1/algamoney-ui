import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";

import { ErrorHandlerService } from "src/app/core/error-handler.service";

import { PessoaService } from "src/app/pessoas/pessoa.service";
import { Pessoa } from "src/app/core/model";
import { Title } from "@angular/platform-browser";

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa= new Pessoa();

  constructor(
      private pessoaService: PessoaService,
      private errorHandler: ErrorHandlerService,
      private _snackBar: MatSnackBar,
      private dialog: MatDialog,
      private route: ActivatedRoute,
      private router: Router,
      private title: Title
  ) { }

  ngOnInit() {
      const idPessoa = this.route.snapshot.params['id'];
      
      this.title.setTitle('Nova Pessoa');
      
      if (idPessoa) {
          this.title.setTitle('Edição de Pessoa');
          this.carregarPessoa(idPessoa);
      }
           
  }
  
  get editando() {
      return Boolean(this.pessoa.id)
  }
  
  carregarPessoa(id: string) {
      this.pessoaService.buscarPorCodigo(id)
      .then(pessoa => {
          this.pessoa = pessoa;
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  salvar(form: NgForm) {
      if(this.editando) {
          this.atualizarPessoa(form);
      } else {
          this.adicionarPessoa(form);
      }
  }
  
  adicionarPessoa(form: NgForm) {

      this.pessoaService.adicionar(this.pessoa)
      .then(pessoaAdicionado => {
          this._snackBar.open('Cadastro realizado com sucesso!','', {
              duration: 2000
          });
          //form.reset();
          //this.pessoa = new Pessoa();
          this.router.navigate(['/pessoas', pessoaAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));

  }
  
  atualizarPessoa(form: NgForm) {
      this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
          this.pessoa = pessoa;
          this._snackBar.open('Pessoa alterada com sucesso!','', {
              duration: 2000
          });
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
      
  }
  
  novo(form: NgForm) {
      form.reset();
      
      setTimeout(function() {
          this.pessoa = new Pessoa();
        }.bind(this), 1);
      
      this.router.navigate(['/pessoas/novo']);
  }
    
  atualizarTituloEdicao() {
      this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }
 
}
