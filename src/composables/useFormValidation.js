import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import {email ,helpers} from '@vuelidate/validators'

const defaultValidationRules = {
  email: {
    email: helpers.withMessage('Email введен неверно ',email)
  }
}

const mergeValidationRules = (defaultRules, customRules) => {
  const merged = { ...defaultRules };

  for (const key in customRules) {
    if (merged[key]) {
      merged[key] = { ...merged[key], ...customRules[key] };
    } else {
      merged[key] = customRules[key];
    }
  }

  return merged;
};

export default function useFormValidation(initialData, validationSchema) {
  const form = ref({ ...initialData })
  const isSubmitting = ref(false)
  const errors = ref(null)

  const mergedValidationSchema = mergeValidationRules(defaultValidationRules,validationSchema)

  // Подключаем Vuelidate без автоматического трекинга
  const v$ = useVuelidate(mergedValidationSchema, form, { $autoDirty: false, $lazy: true })

  const validateForm = () => {
    isSubmitting.value = true
    v$.value.$touch() // Явный вызов валидации только при отправке формы
    if(v$.value.$invalid){
      errors.value = collectErrors(v$.value.$errors)
    }

    return !v$.value.$invalid // Валидация прошла успешно
  }

  const collectErrors = (errors) => {
    return errors.reduce((acc, value) => {
      return { ...acc, [value.$property]: value.$message }
    }, {})
  };

  return {
    form,
    isSubmitting,
    v$,
    validateForm,
    errors
  }
}
