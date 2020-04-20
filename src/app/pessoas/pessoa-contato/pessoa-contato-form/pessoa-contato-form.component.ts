import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Contato, Pessoa } from "src/app/core/model";
import { FormControl } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";
import { PessoaContatoCadastroComponent } from "src/app/pessoas/pessoa-contato/pessoa-contato-cadastro/pessoa-contato-cadastro.component";

@Component({
  selector: 'app-pessoa-contato-form',
  templateUrl: './pessoa-contato-form.component.html',
  styleUrls: ['./pessoa-contato-form.component.css']
})
export class PessoaContatoFormComponent implements OnInit {
    
  @Input() contatos: Array<Contato>;
  contato = new Contato();
  contatoIndex: number;
  pessoa = new Pessoa();
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'star'];

  @ViewChild('contatosTable') private contatosTable: MatTable<Contato>;

  openDialog(): void {
    console.log('Chegou em openDialog --> ', this.contato);

    const dialogRef = this.dialog.open(PessoaContatoCadastroComponent, {
      width: '640px',
      height: '400px',
      //data: {data: this.contato = new Contato()}
      data: this.contato
    });
    
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(this.contato)
      console.log('result: ', result)
      this.contato = result;
      this.contatos.push(this.contato);
      this.contatosTable.renderRows()
    });
  }

  prepararNovoContato() {
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
    this.openDialog();
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    //console.log('Chegou Edicao-->',contato);
    this.contato = this.clonarContato(contato);
    this.contatoIndex = index;
    this.openDialog();
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.id,
      contato.nome, contato.email, contato.telefone);
  }

  confirmarContato(frm: FormControl) {
    //this.contatos.push(this.contato);
    //this.pessoa.contatos.push(this.clonarContato(this.contato));
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);
    
    frm.reset();
  }

  removerContato(index: number) {
    this.contatos.splice(index, 1);
  }

  get editando() {
    return this.contato && this.contato.id;
  }

}
