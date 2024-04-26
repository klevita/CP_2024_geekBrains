<template>
  <div class="login-wrapper">
    <div class="auth-card">
      <div class="auth-card-body">
        <q-form @submit="loginUser()" ref="form" class="auth-card-form">
          <q-input v-model="login" :rules="loginRules" label="Логин" />
          <q-input v-model="pass" type="password" :rules="passRules" label="Пароль" />
        </q-form>
        <div class="auth-card-form-actions">
          <q-checkbox v-model="remeber" density="comfortable" hide-details label="Запомнить меня" />
          <div class="auth-card-form-forgot-link">Забыли пароль?</div>
        </div>
        <div class="auth-card-form-action-btns">
          <q-btn @click="loginUser()" rounded  color="primary">
            Войти
          </q-btn>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useUserStore } from 'stores/UserStore'
import { useRouter } from 'vue-router'

const userStorage = useUserStore()
const router = useRouter()
const error = ref(false)

const form = ref()

const login = ref('')
const loginRules = [(v: string) => (v.length ? true : 'Поле обязательно')]

const pass = ref('')
const passRules = [(v: string) => (v.length ? true : 'Поле обязательно')]

const remeber = ref(false)

async function validate () {
  const valid = await form.value.validate()
  if (valid) {
    await userStorage.login(login.value, pass.value)
    if (userStorage.user.accessToken && userStorage.user.refreshToken) {
      router.push('/')
    } else {
      error.value = true
    }
  }
}

async function loginUser (e?: KeyboardEvent) {
  if (e) {
    const key = e.which || e.keyCode || 0
    if (key === 13) {
      validate()
    }
  } else {
    validate()
  }
}
onMounted(() => {
  document.addEventListener('keypress', loginUser)
})
onBeforeUnmount(() => {
  document.removeEventListener('keypress', loginUser)
})
</script>
<style scoped lang="scss">
.login-wrapper {
  height: 100dvh;
  width: 100dvw;
  background-size: contain;
  background-repeat: no-repeat;
  align-items: center;
  display: flex;
  justify-content: space-around;

  .auth-card {
    border-radius: 20px;
    padding: 24px 30px 4px 30px;
    background-color: white;

    .auth-card-body {
      padding: 24px;
      min-width: 360px;
      text-align: end;

      .auth-card-form {
        &> :first-child {
          margin-bottom: 8px;
        }

        &> :nth-child(2) {
          margin-bottom: -8px;
        }
      }

      .auth-card-form-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 24px;
        & > :first-child{
          margin-left: -10px;
        }

        .auth-card-form-forgot-link {
          cursor: pointer;
          color: $secondary;
          font-size: 14px;
          text-decoration: underline;
        }
      }

      .auth-card-form-action-btns {
        margin-top: 24px;
        display: flex;
      }
    }
  }
}
</style>
