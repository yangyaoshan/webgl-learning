<template>
  <canvas ref="refCanvas" width="600" height="600" style="border: 1px solid #ccc;">

  </canvas>
</template>
<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { drawAPoint } from "./examples/0120-draw-muti-size-interleaved";

const refCanvas = ref()
onMounted(() => {
  drawAPoint(refCanvas.value)
})
</script>

<style scoped>
</style>
