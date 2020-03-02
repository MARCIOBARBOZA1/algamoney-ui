import { Component, OnInit } from '@angular/core';
import { NgForm, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from "@angular/platform-browser";

import { ErrorHandlerService } from "src/app/core/error-handler.service";

import { CategoriaService } from "src/app/categorias/categoria.service";
import { PessoaService } from "src/app/pessoas/pessoa.service";
import { Lancamento } from "src/app/core/model";
import { LancamentoService } from "src/app/lancamentos/lancamento.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
     { label: 'Receita', value: 'RECEITA' },
     { label: 'Despesa', value: 'DESPESA' },
  ];
    
  categorias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private errorHandler: ErrorHandlerService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
      const codigoLancamento = this.route.snapshot.params['id'];
      
      this.title.setTitle('Novo Lançamento');
      
      if (codigoLancamento) {
          this.title.setTitle('Edição de Lançamento');
          this.carregarLancamento(codigoLancamento);
      }
      
      this.carregarCategorias();
      this.carregarPessoas();
  }
  
  get editando() {
      return Boolean(this.lancamento.id)
  }
  
  carregarLancamento(id: string) {
      this.lancamentoService.buscarPorCodigo(id)
      .then(lancamento => {
          this.lancamento = lancamento;
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar(form: FormControl) {
      if(this.editando) {
          this.atualizarLancamento(form);
      } else {
          this.adicionarLancamento(form);
      }
  }
  adicionarLancamento(form: FormControl) {
      this.lancamentoService.adicionar(this.lancamento)
      .then(lancamentoAdicionado => {
          this._snackBar.open('Cadastro realizado com sucesso!','', {
              duration: 2000
          });
          //form.reset();
          //this.lancamento = new Lancamento();
          
          //this.router.navigate(['lancamentos']);
          console.log(this.lancamento);
          console.log(lancamentoAdicionado);
          this.router.navigate(['/lancamentos', lancamentoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }
  
  atualizarLancamento(form: FormControl) {
      this.lancamentoService.atualizar(this.lancamento)
      .then(lancamento => {
          this.lancamento = lancamento;
          this._snackBar.open('Lancamento alterado com sucesso!','', {
              duration: 2000
          });
          this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
      
  }
  
  carregarCategorias() {
      return this.categoriaService.listarTodas()
        .then(categorias => {
          this.categorias = categorias;
        })
        .catch(erro => this.errorHandler.handle(erro));
    }

  carregarPessoas() {
      return this.pessoaService.listarTodas()
         .then(pessoas => {
          this.pessoas = pessoas;
         })
         .catch(erro => this.errorHandler.handle(erro));
  }
  
  novo(form: FormControl) {
      form.reset();
      
      setTimeout(function() {
          this.lancamento = new Lancamento();
        }.bind(this), 1);
      
      this.router.navigate(['/lancamentos/novo']);
  }
  
  atualizarTituloEdicao() {
      this.title.setTitle(`Edição de lançamento: ${this.lancamento.descricao}`);
  }

}