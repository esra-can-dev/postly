import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AddPostForm from '@/components/UserDetail/UserPosts/AddPostForm.vue'
import PrimeVue from 'primevue/config'

const createPostMock = vi.fn(() => Promise.resolve())

vi.mock('@/composables/UserPosts/useUserPosts', () => ({
  default: () => ({
    createPost: createPostMock,
    addButtonLoading: false,
  }),
}))

describe('AddPostForm.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  function mountComponent() {
    return mount(AddPostForm, {
      props: { id: 1 },
      global: {
        plugins: [PrimeVue],
        provide: {
          postState: {
            createPost: createPostMock,
            addButtonLoading: false,
          },
        },
      },
    })
  }

  it('submits valid form and calls createPost', async () => {
    const wrapper = mountComponent()

    await wrapper.find('#on_title').setValue('Test title')
    await wrapper.find('#on_content').setValue('Test content')

    await wrapper.vm.onSubmit()

    expect(createPostMock).toHaveBeenCalledWith({
      title: 'Test title',
      body: 'Test content',
      userId: 1,
    })
  })

  it('shows validation errors when fields are empty', async () => {
    const wrapper = mountComponent()

    await wrapper.vm.onSubmit()
    await wrapper.vm.$nextTick()

    expect(wrapper.vm.errors.title).toBe('Title is a required field')
    expect(wrapper.vm.errors.content).toBe('Content is a required field')
  })
})
