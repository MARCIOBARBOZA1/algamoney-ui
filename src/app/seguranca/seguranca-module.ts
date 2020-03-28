import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JwtModule } from '@auth0/angular-jwt';

import { SegurancaRoutingModule } from './seguranca-routing.module';
import { LoginFormComponent } from './login-form/login-form.component';
import { JwtHelperService } from "@auth0/angular-jwt";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MoneyHttpInterceptor } from "src/app/seguranca/money-http-interceptor";
import { environment } from "src/environments/environment";
import { AuthGuard } from "src/app/seguranca/auth.guard";
import { LogoutService } from "src/app/seguranca/logout.service";

export function tokenGetter() {
    return localStorage.getItem('token');
}

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: environment.tokenWhitelistedDomains,
          blacklistedRoutes: environment.tokenBlacklistedRoutes
        }
    }),
      
    SegurancaRoutingModule
  ],
  declarations: [LoginFormComponent],
  providers: [
    AuthGuard,
    LogoutService
  ]
})
export class SegurancaModule { }