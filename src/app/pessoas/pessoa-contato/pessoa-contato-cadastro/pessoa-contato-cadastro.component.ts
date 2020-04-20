import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Contato, Pessoa } from "src/app/core/model";
import { NgForm, FormControl } from '@angular/forms';
import { MatDialog } from "@angular/material/dialog";

@Component({
  selector: 'app-pessoa-contato-cadastro',
  templateUrl: './pessoa-contato-cadastro.component.html',
  styleUrls: ['./pessoa-contato-cadastro.component.css']
})
export class PessoaContatoCadastroComponent implements OnInit {
  
  contato = new Contato();
  
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('Contato contato-cadastro: ',this.contato);
  }
  
  onClickNO(): void  {
    this.dialog.closeAll();
  }

  get editando() {
    return this.contato && this.contato.id;
  }
}