<template>
  <a-page-header
      :title="props.title"
      :sub-title="props.subtitle ?? null"
  />
</template>

<script setup lang="ts">

const props = defineProps<{
  title: string,
  subtitle?: string
}>()

</script>

<style scoped>

</style>