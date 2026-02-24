<template>
  <div>
    <section-title title="List Decorations"/>
    <a-table :columns="columns" :dataSource="filteredDecorations" :loading="isLoading">
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
<!--      <template #customFilterIcon="{ column, filtered }">-->
<!--        <SearchOutlined-->
<!--            v-if="column.key === 'name'"-->
<!--            :style="{ color: filtered ? '#1677ff' : undefined }"-->
<!--        />-->
<!--      </template>-->
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
import { SearchOutlined } from '@ant-design/icons-vue';
import SectionTitle from "@/ui/components/SectionTitle.vue";
import {computed, h, onMounted, reactive, ref} from "vue";
import {useListDecorationView} from "@/ui/composables/useListDecorationView.ts";
import {getListDecorationStatus} from "@/application/features/decoration/list-decorations/list-decorations.state.ts";

const {
  getDecorations,
  filteredDecorations,
} = useListDecorationView()

const isLoading = computed(() => {
  return getListDecorationStatus.value === 'loading'
})

const skillsFilter = computed(() => {
  let result: any[] = []
  filteredDecorations.value.map((decoration) => {
    decoration.skills?.map((skill) => {
        if(result.filter((r) => r.value === skill.name).length <= 0)
          result.push({
            text: skill.name,
            value: skill.name
          })
    })
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
      filterIcon: (filtered: boolean) =>
          h(SearchOutlined, { style: { color: filtered ? '#1677ff' : undefined } }),
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
      onFilter: (value, record) => {
        return record.skills.some(skill => skill.name === value)
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