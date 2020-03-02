import {Component, Input, EventEmitter, Output } from '@angular/core';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-mat-paginator',
  templateUrl: './mat-paginator.component.html',
  styleUrls: ['./mat-paginator.component.css'],
})
export class MatPaginatorComponent {
  // MatPaginator Inputs
  pageSizeOptions: number[] = [5, 10, 25, 100];
  
  @Input() length: number;
  @Input() pageSize: number;
  @Input() pageIndex: number;

  // MatPaginator Output
  pageEvent: PageEvent;

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
  }
}
