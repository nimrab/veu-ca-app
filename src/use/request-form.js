import {useField, useForm} from "vee-validate";
import {computed, watch} from "vue";
import * as yup from "yup";

export function useRequestForm(fn) {

  const MIN_LEN_NAME = 6
  const MIN_LEN_PHONE = 12
  const MAX_ATTEMPT = 3

  const {handleSubmit, isSubmitting, submitCount} = useForm({
    initialValues:{
      status: 'active'
    }
  })

  const isMaxAttempt = computed(() => submitCount.value > MAX_ATTEMPT)

  const isSubmitBtnDisabled = computed(() => isSubmitting.value || submitCount.value > MAX_ATTEMPT)

  const {value: name, errorMessage: nError, handleBlur: nBlur} = useField('name',
    yup
      .string()
      .required('Обязательное поле')
      .min(MIN_LEN_NAME, `Минимум ${MIN_LEN_NAME} символов`)
  )

  const {value: phone, errorMessage: pError, handleBlur: pBlur} = useField('phone',
    yup
      .string()
      .required('Обязательное поле')
      .min(MIN_LEN_PHONE, `Минимум ${MIN_LEN_PHONE} символов`)
  )

  const {value: amount, errorMessage: aError, handleBlur: aBlur} = useField('amount',
    yup
      .number('Введите числовое значение')
      .positive('Введите положительное число')
      .min(0, 'Введите положительное число')
      .required('Обязательное поле')
  )

  const {value: status} = useField('status')

  const onSubmit = handleSubmit(fn)

  watch(isMaxAttempt, value => {
    if (value) {
      window.setTimeout(() => {
        submitCount.value = 0
      }, 3000)
    }
  })

  return {
    name,
    nError,
    nBlur,
    phone,
    pError,
    pBlur,
    amount,
    aError,
    aBlur,
    status,
    onSubmit,
    isSubmitBtnDisabled,
  }

}