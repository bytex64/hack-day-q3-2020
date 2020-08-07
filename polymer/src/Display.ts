import { html, css, LitElement, property } from 'lit-element';

export class Display extends LitElement {
  static styles = css`
    .display {
      width: 500px;
      height: 500px;
      border: 1px solid black;
    }
  `;

  //@property({ type: Function }) func?: (x: number) => number;
  set func(f: (x: number) => number) {
    this._func = f;
    this.redraw();
  }
  get func(): (x: number) => number {
    if (!this._func) {
      throw new Error('func is not yet defined!');
    }
    return this._func;
  }
  _func?: (x: number) => number;
  
  ctx?: CanvasRenderingContext2D;

  firstUpdated() {
    const canvas = this.renderRoot.querySelector('.display') as HTMLCanvasElement;
    if (!canvas) {
      throw new Error('canvas undefined?');
    }
    canvas.width = 1000;
    canvas.height = 1000;
    this.ctx = canvas.getContext('2d') || undefined;

    if (this.ctx) {
      // scale and move the origin
      this.ctx.scale(1000 / 20, 1000 / 20);
      this.ctx.translate(10, 10);
      // flip the axis
      this.ctx.scale(1, -1);
      this.ctx.lineWidth = 0.05;
      if (this._func) {
        this.redraw();
      }
    } else {
      throw new Error('could not get canvas context');
    }
  }

  redraw() {
    if (!this.ctx || !this.func) return;
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(-10, -10, 20, 20);

    this.ctx.strokeStyle = 'black';

    // X axis
    this.ctx.beginPath();
    this.ctx.moveTo(0, -10);
    this.ctx.lineTo(0, 10);
    this.ctx.stroke();

    // X ticks
    for (let x = -10; x <= 10; x++) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, 0.1);
      this.ctx.stroke();
    }

    // Y axis
    this.ctx.beginPath();
    this.ctx.moveTo(-10, 0);
    this.ctx.lineTo(10, 0);
    this.ctx.stroke();

    // Y ticks
    for (let y = -10; y <= 10; y++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(0.1, y);
      this.ctx.stroke();
    }

    // Draw the function
    this.ctx.strokeStyle = 'blue';
    this.ctx.beginPath();
    this.ctx.moveTo(-10, this.func(-10));
    for (let x = -9.9; x <= 10; x += 0.1) {
      this.ctx.lineTo(x, this.func(x));
    }
    this.ctx.stroke();
  }

  render() {
    return html`
      <canvas class="display"></canvas>
    `;
  }
}
