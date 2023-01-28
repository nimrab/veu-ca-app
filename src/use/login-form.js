import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {computed, watch} from "vue";


export function useLoginForm() {

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

    const onSubmit = handleSubmit(values => {
        console.log('values', values)
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