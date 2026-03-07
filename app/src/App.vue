<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">
          <router-link to="/decorations">Decorations</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/charms">Charms</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/skills">Skills</router-link>
        </a-menu-item>
        <a-menu-item key="4" @click="toggleLanguage">
          {{ currentLanguage === 'en' ? 'anglais' : 'fr' }}
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '0 50px', marginTop: '64px', minHeight: 'calc(100vh - 64px)' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted, ref} from "vue";
import {getStoredLanguage, setStoredLanguage, type AppLanguage} from "@/application/language.ts";

const currentLanguage = ref<AppLanguage>('en')

onMounted(() => {
  currentLanguage.value = getStoredLanguage()
})

const toggleLanguage = () => {
  const nextLanguage: AppLanguage = currentLanguage.value === 'en' ? 'fr' : 'en'
  currentLanguage.value = nextLanguage
  setStoredLanguage(nextLanguage)
  window.location.reload()
}
</script>

<style scoped>
</style>
