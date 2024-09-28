<template>
  <form class="form" @submit.prevent>
    <slot></slot>
    <ButtonDefault
      text="Войти"
      :loading="isLoading"
      :disabled="isLoading"
      @click-detected="onSubmit"
    />
  </form>
</template>

<script setup>
import ButtonDefault from '@/components/common/ButtonDefault.vue'
import { computed, defineProps } from 'vue'
import useVuelidate from '@vuelidate/core'
import { useToastsStore } from '@/stores/toasts'

const emit = defineEmits(['onSubmit'])

const props = defineProps({
  validationRules: {
    type: Object,
    required: true
  },
  formData: {
    type: Object,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const toastsStore = useToastsStore()

const isLoading = computed(() => {
  return props.loading
})

const v$ = useVuelidate(props.validationRules, props.formData)

const onSubmit = async () => {
  v$.$touch() // Призыв к валидации
  if (v$.$invalid) {
    const firstError = Object.keys(v$.value).find((key) => v$[key].$error)
    if (firstError) {
      const errorMessage = v$[firstError].$errors[0]?.$message
      if (errorMessage) {
        await toastsStore.addToast({
          message: errorMessage,
          type: 'error',
          timeout: 3000
        })
      }
    }
    return // Не отправляем, если форма невалидна
  }
  emit('onSubmit')
}
</script>

<style scoped lang="scss">
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>