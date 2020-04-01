import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GoogleChartsModule } from 'angular-google-charts';


@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    
    GoogleChartsModule.forRoot(),
    
    SharedModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
