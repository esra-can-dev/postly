import { ref } from 'vue'
import UsersService from '@/services/UsersService'

export default function useUserDetailCard() {
  const userDetail = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUserById = async (id) => {
    try {
      loading.value = true
      const response = await UsersService.getUserById(id)
      userDetail.value = response.data
    } catch (err) {
      error.value = err.message || 'Veri alınamadı'
    } finally {
      loading.value = false
    }
  }

  return {
    userDetail,
    error,
    fetchUserById,
    loading,
  }
}
