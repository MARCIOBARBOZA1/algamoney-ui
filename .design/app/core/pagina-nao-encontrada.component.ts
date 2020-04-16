import {ElementSelectionService} from './../element-selection.service';
import {ComponentInspectorService} from './../component-inspector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-nao-encontrada',
  template: `
    <br><br><br><br>
    <div class="container">
      <h1 class="text-center">Página não encontrada</h1>
    </div>
  `,
  styles: []
})
export class PaginaNaoEncontradaComponent implements OnInit {

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit() {
  }

}
