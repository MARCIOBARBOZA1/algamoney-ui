import { Title } from '@angular/platform-browser';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";

import { ErrorHandlerService } from './../../core/error-handler.service';
import { CategoriaService } from './../../categorias/categoria.service';
import { PessoaService } from './../../pessoas/pessoa.service';
import { Lancamento } from './../../core/model';
import { LancamentoService } from './../lancamento.service';

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
  //lancamento = new Lancamento();
  formulario: FormGroup;
  uploadEmAndamento = false;
  
  constructor(
    private categoriaService: CategoriaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private errorHandler: ErrorHandlerService,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();

    const idLancamento = this.route.snapshot.params['id'];
    
    this.title.setTitle('Novo lançamento');

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
    
  }
  
  antesUploadAnexo(event) {
      event.xhr.setRequestHeader('Autorization', 'Bearer ' + localStorage.getItem('token'));
      
      this.uploadEmAndamento = true;
  }
  
  aoTerminarUploadAnexo(event) {
      const anexo = event.body;
      
      this.formulario.patchValue({
        anexo: anexo.nome,
        //Abaixo o código que acredito que tenha quer ser...
        //urlAnexo: anexo.url
        //Abaixo o código que recebi para resolver o problema, fixando https!!!
        urlAnexo: (anexo.url as string).replace('\\', 'https://')
      });

      this.uploadEmAndamento = false;
      
  }

  erroUpload(event) {
      this._snackBar.open('Erro ao tentar enviar anexo!','', {
          duration: 2000
      });

      this.uploadEmAndamento = false;
  }

  removerAnexo() {
    this.formulario.patchValue({
      anexo: null,
      urlAnexo: null
    });
  }
  get nomeAnexo() {
      const nome = this.formulario.get('anexo').value;

      if (nome) {
        return nome.substring(nome.indexOf('_') + 1, nome.length);
      }

      return '';
  }

  get urlUploadAnexo() {
      return this.lancamentoService.urlUploadAnexo();
  }

  configurarFormulario() {
      this.formulario = this.formBuilder.group({
        id: [],
        tipo: [ 'RECEITA', Validators.required ],
        dataVencimento: [ null, Validators.required ],
        dataPagamento: [],
        descricao: [ null, [ this.validarObrigatoriedade, this.validarTamanhoMinimo(5) ]],
        valor: [ null, Validators.required ],
        pessoa: this.formBuilder.group({
          id: [ null, Validators.required ],
          nome: []
        }),
        categoria: this.formBuilder.group({
          id: [ null, Validators.required ],
          nome: []
        }),
        observacao: [],
        anexo: [],
        urlAnexo: []
      });
    }

  validarObrigatoriedade(input: FormControl) {
      return (input.value ? null : { obrigatoriedade: true });
    }

  validarTamanhoMinimo(valor: number) {
      return (input: FormControl) => {
        return (!input.value || input.value.length >= valor) ? null : { tamanhoMinimo: { tamanho: valor } };
      };
  }
    
  onFileComplete(data: any) {
      console.log('chegou aqui onFileComplete');
      console.log(data); // We just print out data bubbled up from event emitter.
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarLancamento(id: string) {
    this.lancamentoService.buscarPorCodigo(id)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  salvar() {
    if (this.editando) {
      this.atualizarLancamento();
    } else {
      this.adicionarLancamento();
    }
  }

  adicionarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
      .then(lancamentoAdicionado => {
          this._snackBar.open('Lançamento adicionado com sucesso!','', {
              duration: 2000
          });
        // form.reset();
        // this.lancamento = new Lancamento();
        this.router.navigate(['/lancamentos', lancamentoAdicionado.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
      .then(lancamento => {
        //this.lancamento = lancamento;
        this.formulario.patchValue(lancamento);

        this._snackBar.open('Lançamento alterado com sucesso!','', {
            duration: 2000
        });
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .then(categorias => {
        this.categorias = categorias
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  carregarPessoas() {
    this.pessoaService.listarTodas()
      .then(pessoas => {
        this.pessoas = pessoas
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo() {
    this.formulario.reset();

    setTimeout(function() {
      this.lancamento = new Lancamento();
    }.bind(this), 1);

    this.router.navigate(['/lancamentos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de lançamento: ${this.formulario.get('descricao').value}`);
  }

}

