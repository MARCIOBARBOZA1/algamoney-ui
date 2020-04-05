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
  contato: Contato;
  contatoIndex: number;
  pessoa = new Pessoa();
  exbindoFormularioContato = false;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'star'];
  
  @ViewChild('contatosTable') private contatosTable: MatTable<Contato>;

  openDialog(): void {
      const dialogRef = this.dialog.open(PessoaContatoCadastroComponent, {
        width: '640px',
        height: '400px',
        //data: {data: this.contato = new Contato()}
        data: this.contato = new Contato()
      });
      
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(this.contato)
        this.contato = result;
        this.contatos.push(this.contato);
        this.contatosTable.renderRows()
      });
  }
  
  prepararNovoContato() {
      this.exbindoFormularioContato = true;
      this.contato = new Contato();
      this.contatoIndex = this.pessoa.contatos.length;
    }

    prepararEdicaoContato(contato: Contato, index: number) {
      console.log('Chegou em prepararEdicaoContato:');
      console.log(contato);
      console.log('Terminou.');
      this.contato = this.clonarContato(contato);
      this.contatoIndex = index;
      this.exbindoFormularioContato = true;
      this.openDialog();
    }

  confirmarContato(frm: FormControl) {
      //this.contatos.push(this.contato);
      this.pessoa.contatos.push(this.clonarContato(this.contato));
      
      this.exbindoFormularioContato = false;

      frm.reset();
  }
  
  clonarContato(contato: Contato): Contato {
      return new Contato(contato.id,
        contato.nome, contato.email, contato.telefone);
  }
  
  removerContato(index: number) {
      this.contatos.splice(index, 1);
  }
  
  get editando() {
      return this.contato && this.contato.id;
  }

}
