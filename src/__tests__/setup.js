import { config } from '@vue/test-utils'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'

config.global.plugins = [PrimeVue, ToastService]
