import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import UserDetailCard from '@/components/UserDetail/UserDetailCard/UserDetailCard.vue'

const fetchUserByIdMock = vi.fn()
const mockUserDetail = {
  id: 1,
  name: 'Leanne Graham',
  email: 'Sincere@april.biz',
  phone: '1-770-736-8031 x56442',
  address: {
    street: 'Kulas Light',
    suite: 'Apt. 556',
    city: 'Gwenborough',
    zipcode: '92998-3874',
  },
}

vi.mock('@/composables/Users/useUserDetailCard', () => {
  return {
    default: () => ({
      userDetail: ref(mockUserDetail),
      fetchUserById: fetchUserByIdMock,
      loading: false,
    }),
  }
})

describe('UserDetailCard.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('calls fetchUserById on mount', () => {
    mount(UserDetailCard, {
      props: { id: 1 },
    })
    expect(fetchUserByIdMock).toHaveBeenCalledWith(1)
  })

  it('renders user name and email', () => {
    const wrapper = mount(UserDetailCard, {
      props: { id: 1 },
    })
    expect(wrapper.text()).toContain('Leanne Graham')
    expect(wrapper.text()).toContain('Sincere@april.biz')
  })

  it('renders full address correctly', () => {
    const wrapper = mount(UserDetailCard, {
      props: { id: 1 },
    })

    expect(wrapper.text()).toContain('Kulas Light St, Apt. 556, Gwenborough, 92998-3874')
  })

  it('renders avatar with correct src', () => {
    const wrapper = mount(UserDetailCard, {
      props: { id: 1 },
    })

    const img = wrapper.find('img')
    expect(img.attributes('src')).toContain('Leanne Graham')
  })
})
