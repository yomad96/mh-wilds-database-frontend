<template>
  <a-card>
    <a-flex align="center" justify="space-between">
      <a-flex vertical gap="small">
        {{ skill.name }}
        <skill-bar-level
            :level="skill.level"
            :max-level="skill.maxLevel ?? skill.level"
        />
      </a-flex>
      <a-flex align="center">
        Level {{ skill.level }}
      </a-flex>
    </a-flex>
  </a-card>
</template>

<script setup lang="ts">
import SkillBarLevel from "@/ui/components/SkillBarLevel.vue";

const props = defineProps<{
  skill: {
    name: string,
    level: number,
    maxLevel?: number,
  }
}>()
</script>

<style scoped>

</style>