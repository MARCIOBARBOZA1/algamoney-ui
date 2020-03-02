import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { MatPaginatorComponent } from './pagination/mat-paginator/mat-paginator.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatPaginatorCustom } from './pagination/mat-paginator/mat-paginator-custom';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { AlertComponent } from './alert/alert.component';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [
  MatPaginatorComponent,
  AlertComponent,
  DialogComponent

],
imports: [
  CommonModule,
  BrowserModule,
  PaginationModule.forRoot(),
  MatPaginatorModule,
  MatInputModule,
  FormsModule,
  MatDialogModule
],
exports: [
  PaginationModule,
  MatPaginatorModule,
  MatPaginatorComponent,
  MatSnackBarModule,
],
providers: [
  {
    provide: MatPaginatorIntl,
    useClass: MatPaginatorCustom
  }
],
entryComponents: [
  DialogComponent
]
})
export class SharedModule { }
