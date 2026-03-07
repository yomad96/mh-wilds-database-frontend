<template>
  <div>
    <section-title title="List Skills"/>

    <a-table :columns="columns" :dataSource="tableData" :loading="isLoading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'description'">
          {{ record.description }}
        </template>
        <template v-if="column.key === 'level'">
          {{ record.level }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">
import SectionTitle from "@/ui/components/SectionTitle.vue";
import {computed, onMounted} from "vue";
import {useSkillsViewComposable} from "@/ui/composables/useSkillsViewComposable.ts";
import {getListSkillStatus} from "@/application/features/skill/list-skills/list-skills.state.ts";

const {
  getSkills,
  filteredSkills,
} = useSkillsViewComposable()

const isLoading = computed(() => {
  return getListSkillStatus.value === 'loading'
})

const tableData = computed(() => {
  const rows: any[] = []

  filteredSkills.value.forEach((skill: any) => {
    const ranks = skill.skillRanks?.length ? skill.skillRanks : [null]

    ranks.forEach((rank: any, index: number) => {
      rows.push({
        key: `${skill.id}-${index}`,
        name: skill.name,
        description: rank?.description ?? '',
        level: rank?.level ?? '',
        nameRowSpan: index === 0 ? ranks.length : 0,
      })
    })
  })

  return rows
})

const columns = computed(() => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      customCell: (record: any) => {
        return { rowSpan: record.nameRowSpan }
      },
    },
    {
      title: 'Level',
      key: 'level',
    },
    {
      title: 'Description',
      key: 'description',
    }
  ]
})

onMounted(() => {
  getSkills()
})
</script>

<style scoped>

</style>
