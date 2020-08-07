<template>
  <canvas ref="display" class="display"></canvas>
</template>

<script>
export default {
  name: 'Display',
  props: {
    func: Function,
  },
  mounted: function() {
    const canvas = this.$refs.display;
    canvas.width = 1000;
    canvas.height = 1000;
    this.ctx = canvas.getContext('2d');
    // scale and move the origin
    this.ctx.scale(1000 / 20, 1000 / 20);
    this.ctx.translate(10, 10);
    // flip the axis
    this.ctx.scale(1, -1);
    this.ctx.lineWidth = 0.05;
    //this.redraw();
  },
  watch: {
    func: function() {
      this.redraw();
    }
  },
  methods: {
    redraw: function() {
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
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.display {
  width: 500px;
  height: 500px;
  border: 1px solid black;
}
</style>
