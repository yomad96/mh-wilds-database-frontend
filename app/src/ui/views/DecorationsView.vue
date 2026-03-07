<template>
  <div>
    <section-title title="List Decorations"/>
    <a-table :columns="columns" :dataSource="tableData" :loading="isLoading" :pagination="{ pageSize: 50 }">
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

<script lang="ts" setup>
import { SearchOutlined } from '@ant-design/icons-vue';
import SectionTitle from "@/ui/components/SectionTitle.vue";
import {computed, h, onMounted, reactive, ref} from "vue";
import {useDecorationsViewComposable} from "@/ui/composables/useDecorationsViewComposable.ts";
import {getListDecorationStatus} from "@/application/features/decoration/list-decorations/list-decorations.state.ts";

const {
  getDecorations,
  filteredDecorations,
} = useDecorationsViewComposable()

const isLoading = computed(() => {
  return getListDecorationStatus.value === 'loading'
})

const tableData = computed(() => {
  const rows: any[] = []

  filteredDecorations.value.forEach((decoration: any) => {
    const skills = decoration.skills?.length ? decoration.skills : [null]

    skills.forEach((skill: any, index: number) => {
      const skillName = skill?.name ?? ''
      const skillDescription = skill?.description ?? ''

      rows.push({
        key: `${decoration.id}-${index}`,
        name: decoration.name,
        kind: decoration.kind,
        skillName,
        skillDescription,
      })
    })
  })

  return rows
})

const skillsFilter = computed(() => {
  return tableData.value
      .filter((row: any) => !!row.skillName)
      .reduce((result: any[], row: any) => {
        if (result.every((item) => item.value !== row.skillName)) {
          result.push({
            text: row.skillName,
            value: row.skillName,
          })
        }
        return result
      }, [])
})

const columns = computed(() => {
  return [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      customFilterDropdown: true,
      filterIcon: (filtered: boolean) =>
          h(SearchOutlined, { style: { color: filtered ? '#1677ff' : undefined } }),
      onFilter: (value: any, record: any) => {
        return String(record.name ?? '')
            .toLowerCase()
            .includes(String(value ?? '').toLowerCase())
      },
    },
    {
      title: 'Kind',
      dataIndex: 'kind',
      key: 'kind',
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
  getDecorations()
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
