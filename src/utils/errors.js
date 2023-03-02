const errorTypes = {
  EMAIL_NOT_FOUND: 'Email не найден',
  INVALID_PASSWORD: 'Неверный пароль',
  'TOO_MANY_ATTEMPTS_TRY_LATER : Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later.': 'Слишком много попыток, попробуйте позже',
  auth: 'Необходимо аторизоваться в системе',
  Unauthorized: 'Необходимо аторизоваться в системе',

}

export const error = (error) => errorTypes[error] || 'Неизвестная ошибка'

