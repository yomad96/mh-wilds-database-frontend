<template>
  <div>
    <section-title title="List Skills"/>

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
import {SearchOutlined} from "@ant-design/icons-vue";
import {computed, h, onMounted, reactive, ref} from "vue";
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
