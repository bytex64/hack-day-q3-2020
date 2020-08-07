import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Polynomial } from '../../polynomial';

@Component({
  selector: 'app-polynomial',
  templateUrl: './polynomial.component.html',
  styleUrls: ['./polynomial.component.scss']
})
export class PolynomialComponent implements OnInit {
  a = "0.5";
  b = "0";
  c = "-3";
  @Output() polynomialChanged = new EventEmitter<Polynomial>();

  constructor() { }

  ngOnInit(): void {
    this.convert();
  }

  convert(): void {
    this.polynomialChanged.emit({
      a: parseFloat(this.a),
      b: parseFloat(this.b),
      c: parseFloat(this.c),
    });
  }
}
