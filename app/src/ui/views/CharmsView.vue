<template>
  <div>
    <section-title title="List Charms"/>

    <a-table
        :columns="columns"
        :dataSource="tableData"
        :loading="isLoading"
        bordered
        :pagination="{ pageSize: 50 }"
    >
      <template
          #customFilterDropdown="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
      >
        <div style="padding: 8px">
          <a-input
              ref="searchInput"
              :placeholder="`Search ${column.dataIndex}`"
              :value="selectedKeys[0]"
              style="width: 188px; margin-bottom: 8px; display: block"
              @change="(e: any) => setSelectedKeys(e.target.value ? [e.target.value] : [])"
              @pressEnter="handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
              type="primary"
              size="small"
              style="width: 90px; margin-right: 8px"
              @click="handleSearch(selectedKeys, confirm, column.dataIndex)"
          >
            <template #icon><SearchOutlined /></template>
            Search
          </a-button>
          <a-button size="small" style="width: 90px" @click="handleReset(clearFilters)">
            Reset
          </a-button>
        </div>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'skills'">
          {{ record.skillName }}
        </template>
        <template v-if="column.key === 'description'">
          {{ record.skillDescription }}
        </template>
      </template>
    </a-table>
  </div>
</template>

<script setup lang="ts">

import SectionTitle from "@/ui/components/SectionTitle.vue";
import {SearchOutlined} from "@ant-design/icons-vue";
import {computed, h, onMounted, reactive, ref} from "vue";
import {useCharmsViewComposable} from "@/ui/composables/useCharmsViewComposable.ts";
import type {Skill} from "@/domain/entities/skill.ts";
import {getListCharmStatus} from "@/application/features/charm/list-charms/list-charms.state.ts";

const {
  getCharms,
  filteredCharms,
} = useCharmsViewComposable()

const isLoading = computed(() => {
  return getListCharmStatus.value === 'loading'
})

const tableData = computed(() => {
  const rows: any[] = []

  filteredCharms.value.forEach((charm: any) => {
    const skills = charm.skills?.length ? charm.skills : [null]

    skills.forEach((skill: Skill, index: number) => {
      rows.push({
        key: `${charm.id}-${index}`,
        name: charm.name,
        skillName: skill?.name ? skill.name + ' ' + skill.level : '',
        skillDescription: skill?.description ?? '',
        nameRowSpan: index === 0 ? skills.length : 0,
      })
    })
  })

  return rows
})

const skillsFilter = computed(() => {
  let result: any[] = []
  tableData.value.forEach((row: any) => {
    if (result.every((item) => item.value !== row.skillName)) {
      result.push({
        text: row.skillName,
        value: row.skillName,
      })
    }
  })
  return result
})

const columns = computed(() => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      customFilterDropdown: true,
      filterIcon: (filtered: boolean) => h(SearchOutlined, { style: { color: filtered ? '#1677ff' : undefined } }),
      onFilter: (value: any, record: any) => {
        return String(record.name ?? '')
            .toLowerCase()
            .includes(String(value ?? '').toLowerCase())
      },
      customCell: (record: any) => {
        return { rowSpan: record.nameRowSpan }
      },
    },
    {
      title: 'Skills',
      key: 'skills',
      filters: skillsFilter.value,
      filterSearch: true,
      onFilter: (value: any, record: any) => {
        return record.skillName === value
      }
    },
    {
      title: 'Description',
      dataIndex: ['skill', 'description'],
      key: 'description',
    },
  ]
})

onMounted(() => {
  getCharms()
})

const state = reactive({
  searchText: '',
  searchedColumn: '',
});

const searchInput = ref();

const handleSearch = (selectedKeys: any, confirm: any, dataIndex: any) => {
  confirm();
  state.searchText = selectedKeys[0];
  state.searchedColumn = dataIndex;
};

const handleReset = (clearFilters: any) => {
  clearFilters({ confirm: true });
  state.searchText = '';
};
</script>

<style scoped>

</style>
