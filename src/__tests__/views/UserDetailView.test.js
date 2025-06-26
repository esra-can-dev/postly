import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UserDetailView from '@/views/UserDetailView.vue'
import UserDetailCard from '@/components/UserDetail/UserDetailCard/UserDetailCard.vue'
import AddPostForm from '@/components/UserDetail/UserPosts/AddPostForm.vue'
import UserPostList from '@/components/UserDetail/UserPosts/UserPostList.vue'

describe('UserDetailView', () => {
  it('renders all child components', () => {
    const wrapper = mount(UserDetailView, {
      props: { id: 1 },
    })

    expect(wrapper.findComponent(UserDetailCard).exists()).toBe(true)
    expect(wrapper.findComponent(AddPostForm).exists()).toBe(true)
    expect(wrapper.findComponent(UserPostList).exists()).toBe(true)
  })
})
