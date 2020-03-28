import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent } from "src/app/shared/dialog/dialog.component";
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from "@angular/router";
import { NotAuthenticatedError } from "src/app/seguranca/money-http";

@Injectable()
export class ErrorHandlerService {

  constructor(
      private dialog: MatDialog,
      private router: Router,
  ) { }
  
  handle(errorResponse: any) {
      let msg: string;
  
      if (typeof errorResponse === 'string') {
          msg = errorResponse;
          
      } else if (errorResponse instanceof NotAuthenticatedError) {
          msg = 'Sua sessão expirou!';
          this.router.navigate(['/login']);
      
      } else if (errorResponse instanceof HttpErrorResponse       
          && errorResponse.status >= 400 && errorResponse.status <=499) {
          msg = 'Ocorreu um erro ao processar a sua solicitação.';
          
          if (errorResponse.status === 403) {
              msg = 'Você não tem permissão para executar esta ação'; 
          }
          
          try {
              msg = errorResponse.error[0].mensagemUsuario;
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
