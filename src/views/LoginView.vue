<template>
  <div class="login-page">
    <Container>
      <transition name="fade" mode="out-in">
        <div class="login-page__wrapper" v-if="isLogin">
          <h2 class="login-page__title">Войти</h2>
          <picture>
            <source
              srcset="@/assets/img/login.webp 1x, @/assets/img/login-2x.webp 2x"
              type="image/webp"
            />
            <source srcset="@/assets/img/login.png 1x, @/assets/img/login-2x.png 2x" />
            <img class="login-page__img" src="@/assets/img/login.png" alt="Картинка входа" />
          </picture>
          <form class="login-form" @submit.prevent>
            <InputDefault
              class="login-form__input"
              placeholder="E-mail"
              type="email"
              @change-value="setEmail"
            />
            <InputDefault
              class="login-form__input"
              placeholder="Пароль"
              type="password"
              @change-value="setPassword"
            />
            <ButtonDefault text="Войти" :loading="isLoading" :disabled="isLoading" @click-detected="login" />
            <p class="login-form__other-type">
              У вас нет аккаунта ?
              <a class="login-form__other-link" href="#" @click.prevent="changeForm('register')"
                >Зарегистрироваться</a
              >
            </p>
          </form>
        </div>
        <div class="login-page__wrapper" v-else-if="isRegister">
          <h2 class="login-page__title">Регистрация</h2>
          <picture>
            <source
              srcset="@/assets/img/login.webp 1x, @/assets/img/login-2x.webp 2x"
              type="image/webp"
            />
            <source srcset="@/assets/img/login.png 1x, @/assets/img/login-2x.png 2x" />
            <img class="login-page__img" src="@/assets/img/login.png" alt="Картинка входа" />
          </picture>
          <form class="login-form" @submit.prevent>
            <InputDefault
              class="login-form__input"
              placeholder="Имя"
              type="text"
              @change-value="setName"
            />
            <InputDefault
              class="login-form__input"
              placeholder="E-mail"
              type="email"
              @change-value="setEmail"
            />
            <InputDefault
              class="login-form__input"
              placeholder="Пароль"
              type="password"
              @change-value="setPassword"
            />
            <InputDefault
              class="login-form__input"
              placeholder="Повторить пароль"
              type="password"
              @change-value="setPassword2"
            />
            <ButtonDefault text="Регистрация" :loading="isLoading" :disabled="isLoading" @click-detected="register" />
            <p class="login-form__other-type">
              У вас уже есть аккаунт ?
              <a class="login-form__other-link" href="#" @click.prevent="changeForm('login')"
                >Войти</a
              >
            </p>
          </form>
        </div>
      </transition>
    </Container>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import router from '@/router/index'
import { supabase } from '@/lib/supabaseClient.js'
import { useAuthStore } from '@/stores/auth.ts'
import InputDefault from '@/components/common/InputDefault.vue'
import ButtonDefault from '@/components/common/ButtonDefault.vue'
import Container from '@/components/common/Container.vue'
import { useToastsStore } from '@/stores/toasts'

const typeLogin = ref('login')

const email = ref('')
const password = ref('')
const password2 = ref('')
const name = ref('')
const loading = ref(false)

const authStore = useAuthStore()
const toastsStore = useToastsStore()

const isLogin = computed(() => {
  return typeLogin.value === 'login'
})
const isRegister = computed(() => {
  return typeLogin.value === 'register'
})

const isLoading = computed(() => {
  return loading.value
})

function setEmail(v) {
  email.value = v
}

function setPassword(v) {
  password.value = v
}

function setPassword2(v) {
  password2.value = v
}

function setName(v) {
  name.value = v
}

function changeForm(name) {
  if(!isLoading.value){
    typeLogin.value = name
  }

}

async function translateAndShowError(error) {
  const translations = {
    'Invalid login credentials': 'Неверные учетные данные',
    'User already registered': 'Пользователь уже зарегистрирован',
    'Password is too weak': 'Пароль слишком слабый',
    'missing email or phone': 'Данные для входа не введены'
  }
  await toastsStore.addToast({
    message: translations[error.message],
    type: 'error',
    timeout:3000,
  })
}

async function successForm() {
  const typeMessage = {
    'login': 'Вы успешно авторизованы!',
    'register': 'Регистрация прошла успешно!'

  }
  await toastsStore.addToast({
    message: typeMessage[typeLogin.value],
    type: 'success',
    timeout:3000,
  })
  setTimeout(async () => {
    await authStore.checkLogin()
    await router.push('/')
  }, 2000)
}

async function login() {
  loading.value = true
  const {error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) {
    loading.value = false
    await translateAndShowError(error)
  } else {
    loading.value = false
    await successForm()
  }
}

async function register() {
  loading.value = true
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        first_name: name.value
      }
    }
  })
  if (error) {
    loading.value = false
    await translateAndShowError(error)
  } else {
    loading.value = false
    await successForm()
  }
}
</script>


<style scoped lang="scss">
.login-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  background-color: $brand-25;

  &__wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  &__title {
    text-align: center;
    @include set-font-size(d-2xl, bold);
    color: $gray-900;
  }

  &__img {
    margin-top: 16px;
    width: 300px;
    @media (max-width: 360px) {
      width: 250px;
    }
  }
}

.login-form {
  width: 100%;
  max-width: 360px;
  margin-top: 32px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  &__button {
    margin-top: 16px;
  }

  &__other-type {
    text-align: center;
    @include set-font-size(t-sm, regular);
    color: $gray-900;
  }

  &__other-link {
    text-decoration: none;
    color: $brand-700;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter, .fade-leave-to  {
  opacity: 0;
}
</style>