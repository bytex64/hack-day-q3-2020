<script>
  import { afterUpdate, createEventDispatcher, tick } from 'svelte';

  let a = "0.5",
      b = "0",
      c = "-3";

  const dispatch = createEventDispatcher();

  function notifyPolynomialChanged() {
    dispatch('polynomialChanged', {
      a: parseFloat(a),
      b: parseFloat(b),
      c: parseFloat(c),
    });
  }

  afterUpdate(async () => {
    // waiting for a tick makes this update work after mounting as well
    await tick();
    notifyPolynomialChanged();
  });
</script>

<p class="polynomial">
  <input type="text" bind:value={a} /><i>x<sup>2</sup></i>
  + <input type="text" bind:value={b} /><i>x</i>
  + <input type="text" bind:value={c} />
</p>

<style>
p.polynomial {
  font-size: 24px;
  font-family: serif;
}

input {
  font-size: 24px;
  width: 32px;
  text-align: right;
}
</style>
