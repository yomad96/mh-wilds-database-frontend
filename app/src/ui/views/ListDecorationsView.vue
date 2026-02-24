<template>
  <div>
    <section-title title="List Decorations"/>
    <a-table :columns="columns" :dataSource="filteredDecorations" :loading="isLoading">
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'skills'">
          <div v-if="record.skills.length > 0" v-for="skill in record.skills">
            {{ skill.name }}
          </div>
        </template>
        <template v-if="column.key === 'description'">
          <div v-if="record.skills.length > 0" v-for="skill in record.skills">
            {{ skill.description }}
          </div>
        </template>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts" setup>
import SectionTitle from "@/ui/components/SectionTitle.vue";
import {computed, onMounted} from "vue";
import {useListDecorationView} from "@/ui/composables/useListDecorationView.ts";
import {getListDecorationStatus} from "@/application/features/decoration/list-decorations/list-decorations.state.ts";

const {
  getDecorations,
  filteredDecorations,
} = useListDecorationView()

const isLoading = computed(() => {
  return getListDecorationStatus.value === 'loading'
})

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Skills',
    key: 'skills',
  },
  {
    title: 'Kind',
    dataIndex: 'kind',
    key: 'kind',
  },
  {
    title: 'Description',
    dataIndex: ['skill', 'description'],
    key: 'description',
  },
]

onMounted(() => {
  getDecorations()
})
</script>

<style scoped>

</style>