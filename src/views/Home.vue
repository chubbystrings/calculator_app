<template>
  <app-calculator></app-calculator>
</template>

<script>

import Calculator from '../components/Calculator.vue';

export default {
  name: 'home',
  components: {
    appCalculator: Calculator,
  },
};
</script>
