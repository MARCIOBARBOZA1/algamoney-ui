import {ElementSelectionService} from './../../element-selection.service';
import {ComponentInspectorService} from './../../component-inspector.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/seguranca/auth.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ErrorHandlerService } from "src/app/core/error-handler.service";
import { Router } from "@angular/router";

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent {

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService,

       private auth: AuthService,
       private _snackBar: MatSnackBar,
       private errorHandler: ErrorHandlerService,
       private router: Router
  ) {this.__componentInspectorService.getComp(this);
 }

  login(usuario: string, senha: string) {
     this.auth.login(usuario, senha)
     .then(() => {
       this.router.navigate(['/dashboard']);
     })
     .catch(erro => {
         this.errorHandler.handle(erro);
     });
  }
}
