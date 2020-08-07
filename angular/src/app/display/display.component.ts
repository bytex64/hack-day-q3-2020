import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent {
  @Input()
  set func(f: (x: number) => number) {
    this._func = f;

    if (this.ctx) {
      this.redraw();
    }
  }
  _func: (x: number) => number;

  @ViewChild("display")
  set refDisplay(elem: ElementRef | undefined) {
    if (elem) {
      const canvas = elem.nativeElement;
      canvas.width = 1000;
      canvas.height = 1000;
      this.ctx = elem.nativeElement.getContext('2d');
      // scale and move the origin
      this.ctx.scale(1000 / 20, 1000 / 20);
      this.ctx.translate(10, 10);
      // flip the axis
      this.ctx.scale(1, -1);
      this.ctx.lineWidth = 0.05;
      this.redraw();
    }
  }
  ctx: CanvasRenderingContext2D;

  constructor() { }

  redraw() {
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
    this.ctx.moveTo(-10, this._func(-10));
    for (let x = -9.9; x <= 10; x += 0.1) {
      this.ctx.lineTo(x, this._func(x));
    }
    this.ctx.stroke();
  }
}
