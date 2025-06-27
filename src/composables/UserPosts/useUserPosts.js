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

  const allPostsRaw = ref([])
  const currentStart = ref(0)
  const hasCreateAndDeleteEvent = ref(false)

  const fetchPostsByUserId = async (userId, start) => {
    try {
      loading.value = true
      currentStart.value = start

      if (allPostsRaw.value.length === 0) {
        const { data: allPosts } = await PostService.getAllPostsByUserId(userId)
        allPostsRaw.value = [...allPosts]
        totalPostCount.value = allPosts.length
      }

      if (hasCreateAndDeleteEvent.value) {
        postList.value = allPostsRaw.value.slice(start, start + USER_POST_PAGE_SIZE)
      } else {
        const { data } = await PostService.getPostsByUserId(userId, start, USER_POST_PAGE_SIZE)
        postList.value = data
      }
    } catch {
      showError('There is an error while fetching posts!')
    } finally {
      loading.value = false
    }
  }

  const createPost = async (payload) => {
    try {
      addButtonLoading.value = true
      const { data: newPost } = await PostService.createPost(payload)
      showSuccess('Post successfully added! You can see the new post at the first page!')

      hasCreateAndDeleteEvent.value = true
      totalPostCount.value++

      allPostsRaw.value.unshift({
        ...newPost,
        id: Date.now(),
      })

      postList.value = allPostsRaw.value.slice(
        currentStart.value,
        currentStart.value + USER_POST_PAGE_SIZE,
      )
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
      hasCreateAndDeleteEvent.value = true
      totalPostCount.value--

      allPostsRaw.value = allPostsRaw.value.filter((p) => p.id !== postId)
      postList.value = allPostsRaw.value.slice(
        currentStart.value,
        currentStart.value + USER_POST_PAGE_SIZE,
      )
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
