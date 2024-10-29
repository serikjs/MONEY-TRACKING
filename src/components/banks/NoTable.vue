<template>
  <div class="no-table">
    <h3 class="no-table__title"></h3>
    <form class="no-table-form" @submit.prevent>
      <InputDefault
        name="link-income"
        class="login-form__input"
        :is-error="hasInputError(vNoTable,'link')"
        :err-message="getErrorInputMessage(noTableFormErrors,'link')"
        placeholder="Ссылка на гугл таблицу"
        type="email"
        @change-value="noTableForm.link = $event"
      />
      <ButtonDefault
        text="Отправить"
        :loading="isLoading"
        :disabled="isLoading"
        @click-detected="handleSubmitNoTableForm"
      />
    </form>
  </div>
</template>

<script setup lang="ts">

import ButtonDefault from "@/components/common/ButtonDefault.vue";
import InputDefault from "@/components/common/InputDefault.vue";
import { useTablesStore } from "@/stores/tables";
import useFormValidation from "@/composables/useFormValidation";
import { helpers, required } from "@vuelidate/validators";
import { computed, ref } from "vue";
const tablesStore = useTablesStore()

const loading = ref(false)

const hasInputError = (form: any,field: any) => form[field]?.$error;
const getErrorInputMessage  = (form: any,field: any) => form?.[field];


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
    link: '',
  },
  {
    link: { required: helpers.withMessage('Поле ссылки обязательно', required) },
  }
)

const handleSubmitNoTableForm = () => {
  if (validateNoTableForm()) {
    // login()
  }
}
</script>

<style scoped lang="scss">
.no-table{
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>