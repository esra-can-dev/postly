import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import UsersView from '@/views/UsersView.vue'
import UserList from '@/components/Users/UserList.vue'

describe('UsersView', () => {
  it('renders all child components', () => {
    const wrapper = mount(UsersView)
    expect(wrapper.findComponent(UserList).exists()).toBe(true)
  })
})
