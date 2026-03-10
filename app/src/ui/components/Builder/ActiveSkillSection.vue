<template>
  <a-flex gap="small" vertical>
    <skill-item
        v-for="skill in skills"
        :key="skill.name"
        :skill="skill"
    />
  </a-flex>
</template>

<script setup lang="ts">
import SkillItem from "@/ui/components/SkillItem.vue";

const skills = [
  {
    name: 'test',
    level: 1,
    maxLevel: 3,
  },
  {
    name: 'test2',
    level: 2,
    maxLevel: 4,
  },
  {
    name: 'test3',
    level: 3,
    maxLevel: 5,
  },
  {
    name: 'test2',
    level: 3,
  }
]
</script>

<style scoped>

</style>