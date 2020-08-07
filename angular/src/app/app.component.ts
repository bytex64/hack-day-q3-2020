import { Component } from '@angular/core';

import { Polynomial } from '../polynomial';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Graphing Calculator (Angular)';
  func: (x: number) => number;

  polynomialChanged(p) {
    this.func = new Function('x', `return ${p.a} * x * x + ${p.b} * x + ${p.c}`) as (x: number) => number;
  }
}
