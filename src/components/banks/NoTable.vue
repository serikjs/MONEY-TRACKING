<template>
  <div class="no-table">
    <h3 class="no-table__title">У ваc еще нет таблицы для вкладов</h3>
    <p class="no-table__subtitle">Что бы продолжить нужно поделиться ссылкой на Google таблицу</p>
    <form class="no-table__form" @submit.prevent>
      <InputDefault
        name="link-income"
        class="no-table__input"
        :is-error="hasInputError(vNoTable, 'link')"
        :err-message="getErrorInputMessage(noTableFormErrors, 'link')"
        placeholder="Ссылка на гугл таблицу"
        type="text"
        @change-value="noTableForm.link = $event"
      />
      <ButtonDefault
        class="no-table__btn"
        text="Отправить"
        :loading="isLoading"
        :disabled="isLoading"
        @click-detected="handleSubmitNoTableForm"
      />
    </form>
  </div>
</template>

<script setup lang="ts">
import ButtonDefault from '@/components/common/ButtonDefault.vue'
import InputDefault from '@/components/common/InputDefault.vue'
import { useTablesStore } from '@/stores/tables'
import useFormValidation from '@/composables/useFormValidation'
import { helpers, required } from '@vuelidate/validators'
import { computed, ref } from 'vue'

const tablesStore = useTablesStore()

const loading = ref(false)

const hasInputError = (form: any, field: any) => form[field]?.$error
const getErrorInputMessage = (form: any, field: any) => form?.[field]

const isLoading = computed(() => {
  return loading.value
})

const {
  form: noTableForm,
  v$: vNoTable,
  validateForm: validateNoTableForm,
  errors: noTableFormErrors
} = useFormValidation(
  {
    link: ''
  },
  {
    link: {
      required: helpers.withMessage('Поле ссылки обязательно', required),
      matchGoogleLink: helpers.withMessage('Не похоже на сыллку гугл таблицы', (value: any) => {
        if (!value) {
          return true;
        }

        return /https:\/\/docs\.google\.com\/spreadsheets\/d\/[a-zA-Z0-9-_]+\/?.*/.test(value);
      })
    }
  }
)

const handleSubmitNoTableForm = () => {
  if (validateNoTableForm()) {
    const parts = noTableForm.value.link.split('/d/');
    const sheetId = parts[1].split('/')[0];
    tablesStore.insertTableIncome(sheetId)
  }
}
</script>

<style scoped lang="scss">
.no-table {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &__title {
    @include set-font-size(d-md, semi);
    color: $gray-900;
  }

  &__subtitle {
    margin-top: 20px;
    @include set-font-size(t-xl, regular);
    color: $gray-600;
  }

  &__form {
    width: 100%;
    max-width: 480px;
    margin-top: 64px;
  }

  &__btn {
    margin-top: 32px;
    width: 100%;
  }
}
</style>