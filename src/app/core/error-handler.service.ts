import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";

@Injectable()
export class ErrorHandlerService {

  constructor(public dialog: MatDialog) { }
  
      handle(errorResponse: any) {
          let msg: string;
      
          if (typeof errorResponse === 'string') {
              msg = errorResponse;
          } else if (errorResponse instanceof Response
              && errorResponse.status >= 400 && errorResponse.status <=499) {
              let errros;
              msg = 'Erro ao processar serviço. Tente novamente.';
              
              try {
                  errros = errorResponse.json();
              } catch (e) {}
          } else {
              msg = 'Erro ao processar serviço remoto. Tente novamente.';
              console.error('Ocorreu um erro', errorResponse);
          }
          
      
          this.dialog.open(DialogComponent, {
              width: '350px',
              data: msg
          });

      }
}
