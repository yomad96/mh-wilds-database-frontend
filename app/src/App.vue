<template>
  <a-layout>
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo" />
      <a-menu
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="0">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item key="1">
          <router-link to="/decorations">Decorations</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="/charms">Charms</router-link>
        </a-menu-item>
        <a-menu-item key="3">
          <router-link to="/skills">Skills</router-link>
        </a-menu-item>
        <a-menu-item key="4">
          <router-link to="/builder">Builder</router-link>
        </a-menu-item>
        <a-menu-item key="5" @click="toggleLanguage">
          {{ currentLanguage === 'en' ? 'anglais' : 'fr' }}
        </a-menu-item>
        <a-menu-item v-if="!isAuthenticated" key="6">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!isAuthenticated" key="7">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item v-if="isAuthenticated" key="8" disabled>
          {{ currentUser?.displayName ?? currentUser?.email ?? 'Connected' }}
        </a-menu-item>
        <a-menu-item v-if="isAuthenticated" key="9" @click="handleLogout">
          Logout
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content :style="{ padding: '25px 50px', marginTop: '64px', minHeight: 'calc(100vh - 64px)' }">
      <router-view />
    </a-layout-content>
  </a-layout>
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import {onMounted, ref} from "vue";
import {getStoredLanguage, setStoredLanguage, type AppLanguage} from "@/application/language.ts";
import {useAuthStore} from "@/ui/stores/authStore.ts";
import {storeToRefs} from "pinia";

const currentLanguage = ref<AppLanguage>('en')
const authStore = useAuthStore()
const {currentUser, isAuthenticated} = storeToRefs(authStore)

onMounted(() => {
  currentLanguage.value = getStoredLanguage()
  authStore.initializeAuth()
})

const toggleLanguage = () => {
  const nextLanguage: AppLanguage = currentLanguage.value === 'en' ? 'fr' : 'en'
  currentLanguage.value = nextLanguage
  setStoredLanguage(nextLanguage)
  window.location.reload()
}

const handleLogout = () => {
  authStore.logout()
}
</script>

<style scoped>
</style>
