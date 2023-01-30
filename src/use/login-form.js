import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {computed, watch} from "vue";
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {

  const store = useStore()
  const router = useRouter()

  const MIN_LEN = 6
  const MAX_ATTEMPT = 3

  const {handleSubmit, isSubmitting, submitCount} = useForm()

  const isMaxAttempt = computed(() => submitCount.value > MAX_ATTEMPT)

  const isSubmitBtnDisabled = computed(() => isSubmitting.value || submitCount.value > MAX_ATTEMPT)

  const {value: email, errorMessage: eError, handleBlur: eBlur} = useField('email',
    yup
      .string()
      .trim()
      .required('Обязательное поле')
      .email('Некорректный email')
  )
  const {value: password, errorMessage: pError, handleBlur: pBlur} = useField('password',
    yup
      .string()
      .trim()
      .required('Обязательное поле')
      .min(MIN_LEN, `Минимум ${MIN_LEN} символов`)
  )

  const onSubmit = handleSubmit(async values => {
    try {
      await store.dispatch('auth/login', values)
      await router.push('/')
    } catch (e) {
    }
  })

  watch(isMaxAttempt, value => {
    if (value) {
      window.setTimeout(() => {
        submitCount.value = 0
      }, 3000)
    }
  })
  return {
    email,
    password,
    eError,
    pError,
    onSubmit,
    eBlur,
    pBlur,
    isSubmitBtnDisabled,
    isMaxAttempt,
  }
}