<template>
  <skill-item v-for="skill in skills" :key="skill.name" :skill="skill" />
</template>

<script setup lang="ts">
import SkillItem from "@/ui/components/SkillItem.vue";

const skills = [
  {
    name: 'test',
    level: 1,
  },
  {
    name: 'test2',
    level: 3,
  },
  {
    name: 'test3',
    level: 3,
  },
  {
    name: 'test2',
    level: 3,
  }
]
</script>

<style scoped>

</style>