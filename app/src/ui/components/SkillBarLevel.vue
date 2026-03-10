<template>
  <div class="dot-line">
    <template v-for="i in maxLevel" :key="i">
      <span :class="i <= level ? 'dot colored' : 'dot'"/>
      <span v-if="i < maxLevel" class="bar"/>
    </template>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  level: number,
  maxLevel: number,
}>()
</script>

<style scoped>
.dot-line {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 4px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 999px;
  background: #999;
  flex: 0 0 auto;

  &.colored {
    background: yellow;
  }
}

.bar {
  height: 1px;
  background: #d9d9d9;
  width: 12px;
}
</style>