import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import UserList from '@/components/Users/UserList.vue'

const fetchUsersMock = vi.fn(() => Promise.resolve())
vi.mock('@/composables/Users/useUsers', () => {
  return {
    default: () => ({
      userList: [{ id: 1, name: 'Leanne Graham' }],
      fetchUsers: fetchUsersMock,
      loading: false,
    }),
  }
})

const push = vi.fn()
vi.mock('vue-router', () => ({
  useRouter: () => ({ push }),
}))

describe('UserList.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls fetchUsers on mount', async () => {
    mount(UserList)
    expect(fetchUsersMock).toHaveBeenCalledTimes(1)
  })

  it('calls fetchUsers when refresh button is clicked', async () => {
    const wrapper = mount(UserList)
    const button = wrapper.find('button')
    await button.trigger('click')
    expect(fetchUsersMock).toHaveBeenCalledTimes(2)
  })

  it('navigates to user detail on row click', async () => {
    const wrapper = mount(UserList)
    await wrapper.findComponent({ name: 'DataTable' }).vm.$emit('row-click', {
      data: { id: 1 },
    })
    expect(push).toHaveBeenCalledWith('/users/1')
  })
})
