import {ElementSelectionService} from './../element-selection.service';
import {ComponentInspectorService} from './../component-inspector.service';
import { Component, OnInit } from '@angular/core';

@Component({
  template: `
  <div class="container">
    <br><br><br><br>
    <h1 class="text-center">Acesso negado!</h1>
  </div>
  `,
})
export class NaoAutorizadoComponent implements OnInit {

  constructor(public __elementSelectionService:ElementSelectionService, private __componentInspectorService:ComponentInspectorService) {this.__componentInspectorService.getComp(this);
 }

  ngOnInit() {
  }

}