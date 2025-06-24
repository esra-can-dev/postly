import { useApi } from '@/composables/useApi'

export const postlyApi = useApi(import.meta.env.VITE_POSTLY_API)
