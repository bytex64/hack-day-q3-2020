<script>
  import Polynomial from './Polynomial.svelte';
  import Display from './Display.svelte';

  let func;

  async function polynomialChanged(event) {
    const p = event.detail;
    func = new Function('x', `return ${p.a} * x * x + ${p.b} * x + ${p.c}`);
  }
</script>

<main>
  <h1>Graphing Calculator</h1>
  <Polynomial on:polynomialChanged={ polynomialChanged }/>
  <Display func={ func }/>
</main>

<style>
main {
  font-family: sans-serif;
}
</style>
