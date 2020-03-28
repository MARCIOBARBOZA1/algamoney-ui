import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
    
    constructor(
      public dialog: MatDialog,
      private router: Router
    ) {}
    
    openDialog():void {
        const dialogRef = this.dialog.open(DialogComponent, {
            width: '350px',
            data: 'Por favor, confirmar a exclusão!'
        });
        dialogRef.afterClosed().subscribe(res => {
            console.log(res);
            if (res) {
                console.log('Delete com success!')
            } else {
                console.log('Erro: Registro não deletado!')
            }
        })
    }
    
    exibindoNavBar() {
        return this.router.url !== '/login';
    }

}
