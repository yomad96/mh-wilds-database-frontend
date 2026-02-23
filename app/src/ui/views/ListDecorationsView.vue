<template>
  <div>
    <section-title title="List Decorations" />
    <a-list item-layout="horizontal" :data-source="filteredDecorations" :loading="isLoading">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta description="Ant Design, a design language for background applications, is refined by Ant UED Team">
            <template #title>
              {{ item.name }}
            </template>
            <template #avatar>
              <a-avatar :src="item.icon" />
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </div>
</template>

<script setup lang="ts">
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

onMounted(() => {
  getDecorations()
})
</script>

<style scoped>

</style>