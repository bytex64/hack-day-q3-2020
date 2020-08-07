import { html, css, LitElement, property } from 'lit-element';

export class PolynomialInput extends LitElement {
  static styles = css`
    :host {
      font-size: 24px;
      font-family: serif;
    }

    input {
      font-size: 24px;
      width: 32px;
      text-align: right;
    }
  `;

  @property({type: String}) a = "0.5";
  @property({type: String}) b = "0";
  @property({type: String}) c = "-3";

  connectedCallback() {
    super.connectedCallback();

    this.firePolynomialChanged();
  }

  convert(e: Event) {
    if (e.target instanceof HTMLInputElement) {
      if (e.target.name == 'a') {
        this.a = e.target.value;
      } else if (e.target.name == 'b') {
        this.b = e.target.value;
      } else if (e.target.name == 'c') {
        this.c = e.target.value;
      }
    }

    this.firePolynomialChanged();
  }

  firePolynomialChanged() {
    this.dispatchEvent(new CustomEvent('polynomial-changed', {
      detail: {
        a: parseFloat(this.a),
        b: parseFloat(this.b),
        c: parseFloat(this.c),
      }
    }));
  }

  render() {
    return html`
    <p class="polynomial">
      <input type="text" name="a" @input=${this.convert} value=${this.a} /><i>x<sup>2</sup></i>
      + <input type="text" name="b" @input=${this.convert} value=${this.b} /><i>x</i>
      + <input type="text" name="c" @input=${this.convert} value=${this.c} />
    </p>
    `;
  }
}
