<template>
  <div id="app">
    <h1>Graphing Calculator (Vue)</h1>
    <Polynomial v-on:polynomial-changed="polynomialChanged"/>
    <Display :func="func"/>
  </div>
</template>

<script>
import Polynomial from './components/Polynomial.vue'
import Display from './components/Display.vue'

export default {
  name: 'App',
  components: {
    Polynomial,
    Display,
  },
  data: function() {
    return {
      func: null,
    }
  },
  methods: {
    polynomialChanged: function(p) {
      this.func = new Function('x', `return ${p.a} * x * x + ${p.b} * x + ${p.c}`);
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>
