import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Contato, Pessoa } from "src/app/core/model";
import { FormControl, NgForm } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";
import { MatTable } from "@angular/material/table";

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {
    
  @Input() contatos: Array<Contato>;
  contato: Contato;
  contatoIndex: number;
  pessoa = new Pessoa();
  exbindoFormularioContato = false;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['nome', 'email', 'telefone'];
  
  @ViewChild('contatosTable') private contatosTable: MatTable<Contato>;

  openDialog(): void {
      const dialogRef = this.dialog.open(PessoaContatoCadastroComponent, {
        width: '608px',
        height: '800px',
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

  confirmarContato(frm: NgForm) {
      console.log('chegou aqui confirmar contato');
      console.log(this.pessoa.contatos);
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
