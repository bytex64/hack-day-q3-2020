<script>
  import { onMount, afterUpdate } from 'svelte';
  export let func;
  let canvas, ctx;;

  onMount(() => {
    canvas.width = 1000;
    canvas.height = 1000;
    ctx = canvas.getContext('2d');
    // scale and move the origin
    ctx.scale(1000 / 20, 1000 / 20);
    ctx.translate(10, 10);
    // flip the axis
    ctx.scale(1, -1);
    ctx.lineWidth = 0.05;
  });

  function redraw() {
    if (!func) return;
    ctx.fillStyle = 'white';
    ctx.fillRect(-10, -10, 20, 20);

    ctx.strokeStyle = 'black';

    // X axis
    ctx.beginPath();
    ctx.moveTo(0, -10);
    ctx.lineTo(0, 10);
    ctx.stroke();

    // X ticks
    for (let x = -10; x <= 10; x++) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 0.1);
      ctx.stroke();
    }

    // Y axis
    ctx.beginPath();
    ctx.moveTo(-10, 0);
    ctx.lineTo(10, 0);
    ctx.stroke();

    // Y ticks
    for (let y = -10; y <= 10; y++) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(0.1, y);
      ctx.stroke();
    }

    // Draw the function
    ctx.strokeStyle = 'blue';
    ctx.beginPath();
    ctx.moveTo(-10, func(-10));
    for (let x = -9.9; x <= 10; x += 0.1) {
      ctx.lineTo(x, func(x));
    }
    ctx.stroke();
  }

  afterUpdate(redraw);
</script>

<canvas class="display" bind:this={canvas}></canvas>

<style>
.display {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
</style>
