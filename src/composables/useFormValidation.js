import { ref } from 'vue'
import useVuelidate from '@vuelidate/core'
import { email, helpers, minLength, required } from "@vuelidate/validators";

const defaultValidationRules = {
  email: {
    email: helpers.withMessage('Email введен неверно ',email)
  },
  name:{
    minLength: helpers.withMessage('Минимальная длинна 2', minLength(2))
  },
  password:{
    required: helpers.withMessage('Поле пароль обязательно', required),
    minLength: helpers.withMessage('Минимальная длинна 8', minLength(8))
  },
  confirmPassword:{
    required: helpers.withMessage('Введите проверочный пароль', required),
    sameAsPassword: helpers.withMessage(
      'Пароли не совпадают',
      (value, form) => {
        return value === form.password;
      }
    )
  }
}

const mergeValidationRules = (defaultRules, customRules, form) => {
  const merged = {};

  // Пройдемся по полям формы
  for (const key in form.value) {
    if (defaultRules[key]) {
      // Объединяем дефолтные и пользовательские правила
      merged[key] = { ...defaultRules[key], ...(customRules[key] || {}) };
    } else if (customRules[key]) {
      // Если есть только пользовательские правила
      merged[key] = customRules[key];
    }
  }

  return merged;
};

export default function useFormValidation(initialData, validationSchema) {
  const form = ref({ ...initialData })
  const isSubmitting = ref(false)
  const errors = ref(null)

  const mergedValidationSchema = mergeValidationRules(defaultValidationRules,validationSchema,form)

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
