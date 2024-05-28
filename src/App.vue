<template>
  <div>{{ count }}</div>
  <button @click="count++">+</button>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const count = ref(0)
</script>
