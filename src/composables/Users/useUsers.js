import { ref } from 'vue'
import UsersService from '@/services/UsersService'
import { showError } from '@/utils/toastUtils'

export default function useUsers() {
  const userList = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchUsers = async () => {
    try {
      loading.value = true
      const response = await UsersService.getUsers()
      userList.value = response.data
    } catch {
      showError('There is an error while fetching users!')
    } finally {
      loading.value = false
    }
  }

  return {
    userList,
    error,
    fetchUsers,
    loading,
  }
}
