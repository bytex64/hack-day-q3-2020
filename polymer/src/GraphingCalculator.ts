import { html, css, LitElement, property } from 'lit-element';

import { Polynomial } from './polynomial';

export class GraphingCalculator extends LitElement {
  static styles = css`
    :host {
      font-family: sans-serif;
    }
  `;

  @property({type: Function})
  func?: (x: number) => number;

  polynomialChanged(e: CustomEvent) {
    const p: Polynomial = e.detail;

    this.func = new Function('x', `return ${p.a} * x * x + ${p.b} * x + ${p.c}`) as (x: number) => number;
  }

  render() {
    return html`
      <h1>${this.title}</h1>
      <polynomial-input @polynomial-changed=${ this.polynomialChanged }></polynomial-input>
      <the-display .func=${ this.func }></the-display>
    `;
  }
}
