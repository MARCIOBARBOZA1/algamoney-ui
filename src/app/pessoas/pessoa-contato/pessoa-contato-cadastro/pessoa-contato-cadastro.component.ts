import { Component, OnInit, Input, ViewChild, Inject } from '@angular/core';
import { Contato, Pessoa } from "src/app/core/model";
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {
  
  contato = Contato;
  contatoIndex: number;
  
  constructor(public dialog: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.contato = this.data.contato || new Contato();
  }
  
  onClickNO(): void  {
    this.contato = this.data;
    this.dialog.closeAll();
  }

  get editando() {
    return this.contato;
  }
}