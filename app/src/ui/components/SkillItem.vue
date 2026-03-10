<template>
  <a-card>
    {{ skill.name }} - {{ skill.level}}
  </a-card>
</template>

<script setup lang="ts">
const props = defineProps<{
  skill: {
    name: string,
    level: number,
  }
}>()
</script>

<style scoped>

</style>