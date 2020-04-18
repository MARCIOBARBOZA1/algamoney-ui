import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Contato, Pessoa } from "src/app/core/model";
import { NgForm } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {
    
  @Input() Contato: Array<Contato>;
  contatoIndex: number;
  contato = new Contato();
  pessoa = new Pessoa();
  exbindoFormularioContato = false;
  
  constructor(
          private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['nome', 'email', 'telefone'];
  
  @ViewChild('contatosTable') private contatosTable: MatTable<Contato>;

  confirmarContato(frm: NgForm) {
      console.log('chegou aqui confirmar contato');
      console.log('chegou pessoa contatos--->',this.pessoa.contatos);
      console.log('chegou contato index e contato--->',this.contatoIndex, this.contato );
      this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);

      frm.reset();
  }
  
  clonarContato(contato: Contato): Contato {
      return new Contato(contato.id,
        contato.nome, contato.email, contato.telefone);
  }
  
  get editando() {
      return this.contato && this.contato.id;
  }

}