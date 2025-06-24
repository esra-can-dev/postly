import { ref } from 'vue'
import UsersService from '@/services/UsersService'

export default function useUsers() {
  const userList = ref([])
  const error = ref(null)

  const fetchUsers = async () => {
    try {
      const response = await UsersService.getUsers()
      userList.value = response.data
    } catch (err) {
      error.value = err.message || 'Veri alınamadı'
    }
  }

  return {
    userList,
    error,
    fetchUsers,
  }
}
