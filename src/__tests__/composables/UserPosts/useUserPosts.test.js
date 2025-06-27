import { describe, it, expect, vi, beforeEach } from 'vitest'
import { USER_POST_PAGE_SIZE } from '@/constants/userPosts'

vi.mock('@/services/PostService', () => {
  return {
    default: {
      getAllPostsByUserId: vi.fn(),
      getPostsByUserId: vi.fn(),
      createPost: vi.fn(),
      deletePost: vi.fn(),
    },
  }
})
vi.mock('@/utils/toastUtils', () => {
  return {
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }
})

import PostService from '@/services/PostService'
import { showError, showSuccess } from '@/utils/toastUtils'
import useUserPosts from '@/composables/UserPosts/useUserPosts'

describe('useUserPosts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchPostsByUserId fetches posts and sets values', async () => {
    const { postList, totalPostCount, loading, fetchPostsByUserId } = useUserPosts()

    PostService.getAllPostsByUserId.mockResolvedValueOnce({ data: Array(10).fill({}) })
    PostService.getPostsByUserId.mockResolvedValueOnce({ data: [{ id: 1, title: 'Test' }] })

    await fetchPostsByUserId(1, 0)

    expect(PostService.getAllPostsByUserId).toHaveBeenCalledWith(1)
    expect(PostService.getPostsByUserId).toHaveBeenCalledWith(1, 0, USER_POST_PAGE_SIZE)
    expect(postList.value).toEqual([{ id: 1, title: 'Test' }])
    expect(totalPostCount.value).toBe(10)
    expect(loading.value).toBe(false)
  })

  it('fetchPostsByUserId shows error toast on failure', async () => {
    const { loading, fetchPostsByUserId } = useUserPosts()
    PostService.getAllPostsByUserId.mockRejectedValueOnce(new Error('fail'))

    await fetchPostsByUserId(1, 0)

    expect(PostService.getAllPostsByUserId).toHaveBeenCalledWith(1)
    expect(showError).toHaveBeenCalledWith('There is an error while fetching posts!')
    expect(loading.value).toBe(false)
  })

  it('createPost calls API and shows success toast', async () => {
    const { createPost, addButtonLoading } = useUserPosts()
    const mockPayload = { body: 'foo', title: 'bar', userId: 1 }
    PostService.createPost.mockResolvedValueOnce({ data: { ...mockPayload, id: 101 } })

    await createPost(mockPayload)

    expect(PostService.createPost).toHaveBeenCalledWith(mockPayload)
    expect(showSuccess).toHaveBeenCalledWith(
      'Post successfully added! You can see the new post at the first page!',
    )
    expect(addButtonLoading.value).toBe(false)
  })

  it('createPost shows error toast on failure', async () => {
    const { createPost, addButtonLoading } = useUserPosts()
    const mockPayload = { body: 'foo', title: 'bar', userId: 1 }
    PostService.createPost.mockRejectedValueOnce(new Error('fail'))

    await createPost(mockPayload)

    expect(PostService.createPost).toHaveBeenCalledWith(mockPayload)
    expect(showError).toHaveBeenCalledWith('There is an error while adding a post!')
    expect(addButtonLoading.value).toBe(false)
  })

  it('deletePost calls API and updates loading map', async () => {
    const { deletePost, deleteButtonLoadingMap } = useUserPosts()
    PostService.deletePost.mockResolvedValueOnce({})

    await deletePost(101)

    expect(PostService.deletePost).toHaveBeenCalledWith(101)
    expect(showSuccess).toHaveBeenCalledWith('Post successfully deleted!')
    expect(deleteButtonLoadingMap.value[101]).toBe(false)
  })

  it('deletePost shows error toast on failure', async () => {
    const { deletePost, deleteButtonLoadingMap } = useUserPosts()
    PostService.deletePost.mockRejectedValueOnce(new Error('fail'))

    await deletePost(101)

    expect(PostService.deletePost).toHaveBeenCalledWith(101)
    expect(showError).toHaveBeenCalledWith('There is an error while deleting the post!')
    expect(deleteButtonLoadingMap.value[101]).toBe(false)
  })
})
