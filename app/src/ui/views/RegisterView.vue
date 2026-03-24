<template>
  <section class="auth-page">
    <div class="auth-hero">
      <p class="auth-eyebrow">New Hunter</p>
      <h1>Crée ton compte pour débloquer l’espace perso</h1>
      <p class="auth-copy">
        Ton inscription passe maintenant par une vraie feature dédiée et le store auth centralise tout le comportement métier.
      </p>
    </div>

    <a-card class="auth-card" :bordered="false">
      <a-alert
          v-if="hasRegisterError"
          type="error"
          show-icon
          :message="hasRegisterError"
          style="margin: 0 0 16px"
      />

      <a-form
          layout="vertical"
          :model="formState"
          autocomplete="on"
          @finish="submitRegister"
      >
        <a-form-item
            label="Pseudo"
            name="displayName"
            :rules="[{ required: true, message: 'Renseigne ton pseudo' }]"
        >
          <a-input v-model:value="formState.displayName" size="large" placeholder="Ace Hunter" />
        </a-form-item>

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
            :rules="[{ required: true, message: 'Renseigne un mot de passe' }, { min: 6, message: '6 caractères minimum' }]"
        >
          <a-input-password v-model:value="formState.password" size="large" placeholder="********" />
        </a-form-item>

        <a-form-item
            label="Confirmation"
            name="confirmPassword"
            :rules="confirmPasswordRules"
        >
          <a-input-password v-model:value="formState.confirmPassword" size="large" placeholder="********" />
        </a-form-item>

        <a-button
            type="primary"
            html-type="submit"
            size="large"
            block
            :loading="isLoadingRegister"
        >
          Créer un compte
        </a-button>
      </a-form>

      <p class="auth-footer">
        Déjà inscrit ?
        <router-link to="/login">Se connecter</router-link>
      </p>
    </a-card>
  </section>
</template>

<script setup lang="ts">
import {computed, onMounted, reactive} from "vue";
import {storeToRefs} from "pinia";
import {useRouter} from "vue-router";
import {useAuthStore} from "@/ui/stores/authStore.ts";
import {getRegisterUserError, getRegisterUserStatus} from "@/application/features/auth/register/register-user.state.ts";

const router = useRouter()
const authStore = useAuthStore()

const hasRegisterError = computed(() => {
  return getRegisterUserError.value
})

const isLoadingRegister = computed(() => {
  return getRegisterUserStatus.value === 'loading'
})

const formState = reactive({
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
})

const confirmPasswordRules = [
  { required: true, message: 'Confirme ton mot de passe' },
  {
    validator: async () => {
      if (formState.password !== formState.confirmPassword) {
        throw new Error('Les mots de passe ne correspondent pas')
      }
    },
  },
]

onMounted(() => {
})

const submitRegister = async () => {

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
      radial-gradient(circle at top left, rgba(251, 146, 60, 0.25), transparent 34%),
      linear-gradient(135deg, #111827 0%, #3f1d12 45%, #7c2d12 100%);
  border-radius: 28px;
  padding: 40px;
}

.auth-hero {
  color: #fff7ed;
}

.auth-eyebrow {
  margin: 0 0 12px;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: #fdba74;
  font-weight: 700;
}

.auth-hero h1 {
  margin: 0 0 16px;
  color: #ffffff;
  font-size: clamp(2rem, 4vw, 3.4rem);
  line-height: 1.05;
}

.auth-copy {
  max-width: 540px;
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 247, 237, 0.82);
}

.auth-card {
  width: 100%;
  border-radius: 24px;
  background: rgba(255, 251, 235, 0.96);
  box-shadow: 0 24px 80px rgba(17, 24, 39, 0.22);
}

.auth-footer {
  margin: 20px 0 0;
  text-align: center;
  color: #57534e;
}

.auth-footer a {
  color: #c2410c;
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
