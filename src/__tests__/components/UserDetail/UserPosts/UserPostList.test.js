import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserPostList from '@/components/UserDetail/UserPosts/UserPostList.vue'
import UserPostListSkeleton from '@/components/UserDetail/UserPosts/UserPostListSkeleton.vue'
import DataView from 'primevue/dataview'
import Button from 'primevue/button'

const fetchPostsByUserIdMock = vi.fn(() => Promise.resolve())
const deletePostMock = vi.fn(() => Promise.resolve())

vi.mock('@/composables/UserPosts/useUserPosts', () => {
  return {
    default: () => ({
      postList: [
        { id: 1, title: 'Post 1', body: 'Content 1' },
        { id: 2, title: 'Post 2', body: 'Content 2' },
      ],
      fetchPostsByUserId: fetchPostsByUserIdMock,
      loading: false,
      totalPostCount: 2,
      deletePost: deletePostMock,
      deleteButtonLoadingMap: {},
    }),
  }
})

describe('UserPostList.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders posts in DataView', async () => {
    const wrapper = mount(UserPostList, {
      props: { id: 1 },
      global: {
        stubs: {
          DataView,
          Button,
          UserPostListSkeleton,
        },
      },
    })

    expect(wrapper.findComponent(UserPostListSkeleton).exists()).toBe(false)
    expect(wrapper.findComponent(DataView).exists()).toBe(true)

    expect(wrapper.text()).toContain('Post 1')
    expect(wrapper.text()).toContain('Content 1')
  })

  it('calls fetchPostsByUserId on page change', async () => {
    const wrapper = mount(UserPostList, {
      props: { id: 1 },
    })
    await wrapper.vm.onPageChange({ first: 3 })

    expect(wrapper.vm.first).toBe(3)
    expect(fetchPostsByUserIdMock).toHaveBeenCalledWith(1, 0)
  })

  it('calls deletePost when delete button clicked', async () => {
    const wrapper = mount(UserPostList, {
      props: { id: 1 },
    })
    const deleteButtons = wrapper.findAllComponents(Button)
    await deleteButtons[0].trigger('click')

    expect(deletePostMock).toHaveBeenCalledWith(1)
  })
})
