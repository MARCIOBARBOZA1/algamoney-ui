import { MatPaginatorIntl } from '@angular/material';
import { Injectable } from "@angular/core";

@Injectable()
export class MatPaginatorCustom extends MatPaginatorIntl {
  constructor() {
    super();
    this.nextPageLabel = ' My new label for next page';
    this.previousPageLabel = ' My new label for previous page';
    this.itemsPerPageLabel = 'Quantidade por pagina';
  }
}
