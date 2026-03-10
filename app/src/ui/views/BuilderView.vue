<template>
  <a-row :gutter="16">
    <a-col :span="8">
      <ActiveSkillSection />
    </a-col>
    <a-col :span="8">
      Builder
    </a-col>
    <a-col :span="8">
      Global stat
    </a-col>
  </a-row>
</template>

<script setup lang="ts">

import ActiveSkillSection from "@/ui/components/Builder/ActiveSkillSection.vue";
</script>

<style scoped>

</style>