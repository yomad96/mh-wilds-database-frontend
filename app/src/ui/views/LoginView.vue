<template>
  <section class="auth-page">
    <div class="auth-hero">
      <p class="auth-eyebrow">Hunter Access</p>
      <h1>Connecte-toi pour sauvegarder ta progression</h1>
      <p class="auth-copy">
        Retrouve ton profil, tes builds et la suite des features auth dans une interface proprement branchée sur le store.
      </p>
    </div>

    <a-card class="auth-card" :bordered="false">
      <template v-if="isAuthenticated">
        <a-alert
            type="success"
            show-icon
            :message="`Connecté en tant que ${currentUser?.displayName ?? currentUser?.email ?? 'hunter'}`"
        />
      </template>

      <a-alert
          v-else-if="registeredMessage"
          type="success"
          show-icon
          :message="registeredMessage"
          style="margin-bottom: 16px"
      />

      <a-alert
          v-if="loginError"
          type="error"
          show-icon
          :message="loginError"
          style="margin: 0 0 16px"
      />

      <a-form
          layout="vertical"
          :model="formState"
          autocomplete="on"
          @finish="submitLogin"
      >
        <a-form-item
            label="Email"
            name="email"
            :rules="[{ required: true, message: 'Renseigne ton email' }, { type: 'email', message: 'Email invalide' }]"
        >
          <a-input v-model:value="formState.email" size="large" placeholder="hunter@wilds.gg" />
        </a-form-item>

        <a-form-item
            label="Mot de passe"
            name="password"
            :rules="[{ required: true, message: 'Renseigne ton mot de passe' }]"
        >
          <a-input-password v-model:value="formState.password" size="large" placeholder="********" />
        </a-form-item>

        <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="isLoggingIn"
            :disabled="isAuthenticated"
        >
          Se connecter
        </a-button>
      </a-form>

      <p class="auth-footer">
        Pas encore de compte ?
        <router-link to="/register">Créer un compte</router-link>
      </p>
    </a-card>
  </section>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import {useRoute, useRouter} from "vue-router";
import {useAuthStore} from "@/ui/stores/authStore.ts";

const router = useRouter()
const route = useRoute()
const authStore = useAuthStore()

const {currentUser, isAuthenticated, isLoggingIn, loginError} = storeToRefs(authStore)

const formState = reactive({
  email: '',
  password: '',
})

const registeredMessage = computed(() => {
  return route.query.registered === '1'
      ? 'Compte créé avec succès, tu peux maintenant te connecter.'
      : null
})

onMounted(async () => {
  authStore.resetLoginState()
  await authStore.initializeAuth()
})

const submitLogin = async () => {
  const isSuccess = await authStore.login({
    email: formState.email,
    password: formState.password,
  })

  if (isSuccess) {
    await router.push({name: 'home'})
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 114px);
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(320px, 420px);
  gap: 32px;
  align-items: center;
  background:
      radial-gradient(circle at top left, rgba(214, 167, 92, 0.22), transparent 36%),
      linear-gradient(135deg, #0f172a 0%, #1f2937 50%, #2d1b12 100%);
  border-radius: 28px;
  padding: 40px;
}

.auth-hero {
  color: #f8fafc;
}

.auth-eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #f6c36b;
  font-weight: 700;
}

.auth-hero h1 {
  margin: 0 0 16px;
  color: #fff7ed;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.auth-copy {
  max-width: 540px;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(248, 250, 252, 0.82);
}

.auth-card {
  width: 100%;
  border-radius: 24px;
  background: rgba(255, 248, 235, 0.96);
  box-shadow: 0 24px 80px rgba(15, 23, 42, 0.24);
}

.auth-footer {
  margin: 20px 0 0;
  text-align: center;
  color: #475569;
}

.auth-footer a {
  color: #b45309;
  font-weight: 600;
}

@media (max-width: 900px) {
  .auth-page {
    grid-template-columns: 1fr;
    padding: 24px;
  }

  .auth-copy {
    max-width: none;
  }
}
</style>
