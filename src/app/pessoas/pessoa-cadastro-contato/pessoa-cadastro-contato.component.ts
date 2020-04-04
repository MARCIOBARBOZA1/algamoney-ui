import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Contato, Pessoa } from "src/app/core/model";
import { FormControl } from "@angular/forms/forms";
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {
    
  @Input() contatos: Array<Contato>;
  contato: Contato;
  contatoIndex: number;
  pessoa = new Pessoa();
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'star'];
  
  @ViewChild('contatosTable') private contatosTable: MatTable<Contato>;

  openDialog(): void {
      const dialogRef = this.dialog.open(PessoaCadastroContatoComponent, {
        width: '300px',
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

  confirmarContato(frm: FormControl) {
      //this.contatos.push(this.contato);
      this.pessoa.contatos.push(this.clonarContato(this.contato));

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
