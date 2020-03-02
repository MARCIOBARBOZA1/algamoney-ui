import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { FormControl } from "@angular/forms/forms";
import { ActivatedRoute } from "@angular/router";

import { ErrorHandlerService } from "src/app/core/error-handler.service";

import { PessoaService } from "src/app/pessoas/pessoa.service";
import { Pessoa } from "src/app/core/model";

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
      private route: ActivatedRoute
  ) { }

  ngOnInit() {
  }
  
  salvar(form: FormControl) {
      console.log(this.pessoa);
      this.pessoaService.adicionar(this.pessoa)
      .then(() => {
          this._snackBar.open('Cadastro realizado com sucesso!','', {
              duration: 2000
      })
      form.reset();
      this.pessoa = new Pessoa();
  })
  .catch(erro => this.errorHandler.handle(erro));

  }
 
}
