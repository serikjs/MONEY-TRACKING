<template>
  <div class="login-page">
    <Container>
      <transition name="fade" mode="out-in">
        <div class="login-page__wrapper" v-if="isLogin">
          <h2 class="login-page__title">Войти</h2>
          <picture>
            <source
              srcset="../assets/img/login.webp 1x, @/assets/img/login-2x.webp 2x"
              type="image/webp"
            />
            <source srcset="../assets/img/login.png 1x, @/assets/img/login-2x.png 2x" />
            <img class="login-page__img" src="../assets/img/login.png" alt="Картинка входа" />
          </picture>
          <form class="login-form" @submit.prevent>
            <InputDefault
              class="login-form__input"
              :is-error="hasInputError(vLogin,'email')"
              :err-message="getErrorInputMessage(loginFormErrors,'email')"
              placeholder="E-mail"
              type="email"
              @change-value="loginForm.email = $event"
            />
            <InputDefault
              class="login-form__input"
              :is-error="hasInputError(vLogin,'password')"
              :err-message="getErrorInputMessage(loginFormErrors,'password')"
              placeholder="Пароль"
              type="password"
              @change-value="loginForm.password = $event"
            />
            <ButtonDefault
              text="Войти"
              :loading="isLoading"
              :disabled="isLoading"
              @click-detected="handleSubmitFormLogin"
            />
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
              srcset="../assets/img/login.webp 1x, @/assets/img/login-2x.webp 2x"
              type="image/webp"
            />
            <source srcset="../assets/img/login.png 1x, @/assets/img/login-2x.png 2x" />
            <img class="login-page__img" src="../assets/img/login.png" alt="Картинка входа" />
          </picture>
          <form class="login-form" @submit.prevent>
            <InputDefault
              :is-error="hasInputError(vRegister,'name')"
              :err-message="getErrorInputMessage(registerFormErrors,'name')"
              class="login-form__input"
              placeholder="Имя"
              type="text"
              @change-value="registerForm.name = $event"
            />
            <InputDefault
              :is-error="hasInputError(vRegister,'email')"
              :err-message="getErrorInputMessage(registerFormErrors,'email')"
              class="login-form__input"
              placeholder="E-mail"
              type="email"
              @change-value="registerForm.email = $event"
            />
            <InputDefault
              :is-error="hasInputError(vRegister,'password')"
              :err-message="getErrorInputMessage(registerFormErrors,'password')"
              class="login-form__input"
              placeholder="Пароль"
              type="password"
              @change-value="registerForm.password = $event"
            />
            <InputDefault
              :is-error="hasInputError(vRegister,'confirmPassword')"
              :err-message="getErrorInputMessage(registerFormErrors,'confirmPassword')"
              class="login-form__input"
              placeholder="Повторить пароль"
              type="password"
              @change-value="registerForm.confirmPassword = $event"
            />
            <ButtonDefault
              text="Регистрация"
              :loading="isLoading"
              :disabled="isLoading"
              @click-detected="handleSubmitFormRegister"
            />
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
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth'
import { useToastsStore } from '@/stores/toasts'
import InputDefault from '@/components/common/InputDefault.vue'
import ButtonDefault from '@/components/common/ButtonDefault.vue'
import Container from '@/components/common/Container.vue'
import useFormValidation from '@/composables/useFormValidation.js'
import { helpers, required} from '@vuelidate/validators'



const router = useRouter();

const authStore = useAuthStore()
const toastsStore = useToastsStore()

const typeLogin = ref('login')
const loading = ref(false)

const {
  form: loginForm,
  v$: vLogin,
  validateForm: validateFormLogin,
  errors: loginFormErrors
} = useFormValidation(
  {
    email: '',
    password: ''
  },
  {
    email: { required: helpers.withMessage('Поле email обязательно', required) },
  }
)

const {
  form: registerForm,
  v$: vRegister,
  validateForm: validateFormRegister,
  errors: registerFormErrors
} = useFormValidation(
  {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  },
  {
    email: { required: helpers.withMessage('Поле email обязательно', required) },
  }
)

const isLogin = computed(() => {
  return typeLogin.value === 'login'
})
const isRegister = computed(() => {
  return typeLogin.value === 'register'
})

const isLoading = computed(() => {
  return loading.value
})

const hasInputError = (form,field) => form[field]?.$error;
const getErrorInputMessage  = (form,field) => form?.[field];

const handleSubmitFormLogin = () => {
  if (validateFormLogin()) {
    login()
  }
}
const handleSubmitFormRegister = () => {
  if (validateFormRegister()) {
    register()
  }
}

const  changeForm = (name)=> {
  if (!isLoading.value) {
    typeLogin.value = name
  }
}

 const translateAndShowError = async (error) => {
   console.log("error",error);
  const translations = {
    'Invalid login credentials': 'Неверные учетные данные',
    'User already registered': 'Пользователь уже зарегистрирован',
    'Password is too weak': 'Пароль слишком слабый',
    'missing email or phone': 'Данные для входа не введены'
  }
  await toastsStore.addToast({
    message: translations[error.message],
    type: 'error',
    timeout: 3000
  })
}

 const successForm = async()=> {
  const typeMessage = {
    login: 'Вы успешно авторизованы!',
    register: 'Регистрация прошла успешно!'
  }
  await toastsStore.addToast({
    message: typeMessage[typeLogin.value],
    type: 'success',
    timeout: 3000
  })
   await authStore.checkLogin()
  setTimeout(async () => {
    await router.push('/')
  }, 2000)
}

 const login = async() => {
  loading.value = true
  const error = await authStore.login({
    email:loginForm.value.email,
    password:loginForm.value.password,
  })
  if (error) {
    loading.value = false
    await translateAndShowError(error)
  } else {
    loading.value = false
    await successForm()
  }
}

 const register = async() => {
  loading.value = true
  const error = await authStore.register({
    email:registerForm.value.email,
    password:registerForm.value.password,
    name: registerForm.value.name
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

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>