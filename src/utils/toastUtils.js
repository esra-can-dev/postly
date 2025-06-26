import { app } from '@/main'

const lifeTime = 3000

export function showSuccess(message) {
  app.config.globalProperties.$toast.add({
    severity: 'success',
    summary: 'Success',
    detail: message,
    life: lifeTime,
  })
}

export function showError(message) {
  app.config.globalProperties.$toast.add({
    severity: 'error',
    summary: 'Error',
    detail: message,
    life: lifeTime,
  })
}
