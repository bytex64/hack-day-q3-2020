<template>
  <p class="polynomial">
    <input type="text" v-model="a"/><i>x<sup>2</sup></i>
    + <input type="text" v-model="b"/><i>x</i>
    + <input type="text" v-model="c"/>
  </p>
</template>

<script>
export default {
  name: 'Polynomial',
  data: function() {
    return {
      a: "0.5",
      b: "0",
      c: "-3",
    }
  },
  created: function() {
    this.$emit('polynomial-changed', this.polynomial);
  },
  computed: {
    polynomial: function() {
      return {
        a: parseFloat(this.a),
        b: parseFloat(this.b),
        c: parseFloat(this.c),
      }
    }
  },
  watch: {
    polynomial: function() {
      this.$emit('polynomial-changed', this.polynomial);
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.polynomial {
  font-size: 24px;
  font-family: serif;
}

input {
  font-size: 24px;
  width: 32px;
  text-align: right;
}
</style>
