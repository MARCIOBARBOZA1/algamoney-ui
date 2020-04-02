import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { MatFileUploadComponent } from './upload/mat-file-upload/mat-file-upload.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { MatProgressBarModule } from "@angular/material/progress-bar";

@NgModule({
  declarations: [
  MatPaginatorComponent,
  AlertComponent,
  DialogComponent,
  MatFileUploadComponent  
],
imports: [
  CommonModule,
  BrowserModule,
  PaginationModule.forRoot(),
  MatPaginatorModule,
  MatInputModule,
  FormsModule,
  MatDialogModule,
  BrowserAnimationsModule,
  MatIconModule,
  MatProgressBarModule
],
exports: [
  PaginationModule,
  MatPaginatorModule,
  MatPaginatorComponent,
  MatSnackBarModule,
  MatIconModule,
  MatProgressBarModule,
  MatFileUploadComponent 
],
schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
providers: [
  {
    provide: MatPaginatorIntl,
    useClass: MatPaginatorCustom
  },
  {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
],
entryComponents: [
  DialogComponent
]
})
export class SharedModule { }
