import { Component, OnInit, Input } from '@angular/core';
import { Contato } from "src/app/core/model";
import { PessoaContato } from "src/app/pessoas/pessoa-cadastro/pessoa-cadastro.component";
import { FormControl } from "@angular/forms/forms";
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-pessoa-cadastro-contato',
  templateUrl: './pessoa-cadastro-contato.component.html',
  styleUrls: ['./pessoa-cadastro-contato.component.css']
})
export class PessoaCadastroContatoComponent implements OnInit {
    
  @Input() contatos: Array<Contato>;
  contato: Contato;
  contatoIndex: number;
  
  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  
  displayedColumns: string[] = ['nome', 'email', 'telefone', 'star'];

  openDialog(): void {
      const dialogRef = this.dialog.open(PessoaContato, {
        width: '300px',
        data: {data: this.contato = new Contato()}
      });
      

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(this.contato)
        this.contato = result;
      });
  }

  confirmarContato(frm: FormControl) {
      console.log('Confirmar Contato');
      this.contatos.push(this.contato);

      frm.reset();
  }
  
  removerContato(index: number) {
      this.contatos.splice(index, 1);
  }
  
  get editando() {
      return this.contato && this.contato.id;
  }

}
