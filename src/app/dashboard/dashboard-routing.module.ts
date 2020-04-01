import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from "src/app/dashboard/dashboard/dashboard.component";
import { AuthGuard } from "src/app/seguranca/auth.guard";

const routes: Routes = [
    { 
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
