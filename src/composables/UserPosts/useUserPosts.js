import { ref } from 'vue'
import PostService from '@/services/PostService'
import { USER_POST_PAGE_SIZE } from '@/constants/userPosts'
import { showError, showSuccess } from '@/utils/toastUtils'

export default function useUserPosts() {
  const postList = ref([])
  const loading = ref(false)
  const totalPostCount = ref(null)
  const addButtonLoading = ref(false)
  const deleteButtonLoadingMap = ref({})

  const fetchPostsByUserId = async (userId, start) => {
    try {
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
    } catch {
      showError('There is an error while fetching posts!')
    } finally {
      loading.value = false
    }
  }

  const createPost = async (payload) => {
    try {
      addButtonLoading.value = true
      await PostService.createPost(payload)
      showSuccess('Post successfully added!')
    } catch {
      showError('There is an error while adding a post!')
    } finally {
      addButtonLoading.value = false
    }
  }

  const deletePost = async (postId) => {
    try {
      deleteButtonLoadingMap.value[postId] = true
      await PostService.deletePost(postId)
      showSuccess('Post successfully deleted!')
    } catch {
      showError('There is an error while deleting the post!')
    } finally {
      deleteButtonLoadingMap.value[postId] = false
    }
  }

  return {
    postList,
    fetchPostsByUserId,
    totalPostCount,
    loading,
    createPost,
    deletePost,
    deleteButtonLoadingMap,
    addButtonLoading,
  }
}
