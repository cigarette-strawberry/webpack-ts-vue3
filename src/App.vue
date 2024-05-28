<template>
  <div>{{ count }}</div>
  <button @click="count++">+</button>
  <div>{{ moment().format('YYYY-MM-DD HH:mm:ss') }}</div>
</template>

<script setup lang="ts">
import moment from 'moment'
import { ref } from 'vue'
const count = ref(0)
</script>

<style lang="less">
@aqua: aqua;
html,
body {
  background-color: @aqua;
}
</style>
