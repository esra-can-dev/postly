import { ref } from 'vue'
import PostService from '@/services/PostService'
import { USER_POST_PAGE_SIZE } from '@/constants/userPosts'

export default function useUserPosts() {
  const postList = ref([])
  const loading = ref(false)
  const error = ref(null)
  const totalPostCount = ref(null)

  const fetchPostsByUserId = async (userId, start) => {
    loading.value = true

    if (totalPostCount.value === null) {
      const allPosts = await PostService.getAllPostsByUserId(userId)
      totalPostCount.value = allPosts.data.length
    }

    const { data } = await PostService.getPostsByUserId(
      userId,
      start * USER_POST_PAGE_SIZE,
      USER_POST_PAGE_SIZE,
    )
    postList.value = data

    loading.value = false
  }

  return {
    postList,
    error,
    fetchPostsByUserId,
    totalPostCount,
    loading,
  }
}
